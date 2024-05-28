
import { VStack, HStack, Text } from "@chakra-ui/layout"
import dayjs from "dayjs"
import { LoadingList } from "../loading/LoadingList"
import { LivequeryBaseEntity } from "@livequery/types"
import { CollectionData } from "@livequery/react"
import { SmartQueryItem } from "@livequery/client"
import { PropsWithChildren, useEffect, useRef } from "react"

export type WrapperComponent = (props: { children: any }) => JSX.Element

export type ListRender<T extends LivequeryBaseEntity> = {
    collection: CollectionData<T>
    day_group?: boolean,
    render: (item: SmartQueryItem<T>, index: number, list: T[]) => JSX.Element
    empty_alert?: string | JSX.Element,
    wrapper?: WrapperComponent
    spacing?: string
    sort?: (a: T, b: T) => number
    loading_date?: boolean
    exportable_fields?: Array<keyof T>
}

export const InViewportDetector = ({ onVisibilityChange, children }: PropsWithChildren<{ onVisibilityChange?: Function }>) => {
    const targetRef = useRef(null)

    useEffect(() => {
        if (!onVisibilityChange) return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(
                    (entry) => onVisibilityChange(entry.isIntersecting)
                )
            }
        )
        // Start observing the target element
        if (targetRef.current) {
            observer.observe(targetRef.current);
        }
        // Cleanup the observer when the component unmounts
        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [onVisibilityChange]);

    return <div ref={targetRef} style={{ width: '100%' }}>{children}</div>;
};


export const ListRender = <T extends { created_at: number, id: string }>(props: ListRender<T>) => {

    const Wrapper = props.wrapper || (props => props.children)
    const formatDate = (date: number, locale: string) => {
        dayjs.locale(locale);
        if (locale === 'vi') {
            return dayjs(date).format('MM/YYYY');
        } else {
            return dayjs(date).format('MMMM YYYY');
        }
    }

    // Lấy số lượng đơn hàng theo tháng
    const ordersByMonth: Record<string, number> = {}
    props.collection.items.forEach((order) => {
        const monthKey = new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "2-digit" });
        if (!ordersByMonth[monthKey]) {
            ordersByMonth[monthKey] = 1; // Nếu tháng chưa tồn tại, đặt số lượng là 1
        } else {
            ordersByMonth[monthKey] += 1; // Nếu tháng đã tồn tại, tăng số lượng lên 1
        }
    })

    return (
        <VStack w='full' spacing={props.spacing}>
            {
                props.collection.items
                    .map(item => ({ ...item, _date: new Date(item.created_at).toLocaleDateString("en-US", { year: "numeric", month: "2-digit" }) }))
                    .map((item, i, arr) => (
                        <VStack w='full' key={item.id} spacing='4'>
                            {
                                props.day_group && (i == 0 || (item._date != arr[i - 1]._date)) && (
                                    <HStack w='full'>
                                        <Text fontWeight='600'>Tháng {dayjs(item.created_at).format('MM/YYYY')}</Text>
                                        <Text opacity='0.8'>({ordersByMonth[item._date]})</Text>
                                    </HStack>
                                )
                            }
                            <InViewportDetector onVisibilityChange={i != arr.length - 5 ? undefined : (
                                (visible: boolean) => {
                                    visible && props.collection.fetch_more?.()
                                }
                            )}>
                                {props.render(item, i, arr)}
                            </InViewportDetector>
                        </VStack>
                    ))
            }
            {props.collection?.loading && props.loading_date && <LoadingList date_loading />}
            {props.collection?.loading && !props.loading_date && <LoadingList />}
            {props.collection.empty && <VStack w='full'>{props.empty_alert}</VStack>}
        </VStack>
    )
}




