

import { Box, Button, Input, useBoolean } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import { useRef } from "react"
import { BiCalendar } from "react-icons/bi"

export type DatePicker = {
    onChange: (date: Date) => any
    date?: Date
}

export const DatePicker = (props: DatePicker) => {

    const [pickVisible, setPickVisible] = useBoolean()
    const datePickerRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.click();
        }
    };

    const isMobile = typeof navigator != 'undefined' ? /Mobi|Android/i.test(navigator?.userAgent) : false

    return (
        <Box>
            <Button
                size='sm'
                borderRadius='5px'
                leftIcon={<BiCalendar />}
                onClick={isMobile ? handleButtonClick : setPickVisible.toggle}
            >
                {props.date == null ? 'Chọn ngày' : props.date.toLocaleDateString('vi')}
            </Button>
            <Input
                type="date"
                ref={datePickerRef}
                pos='fixed'
                top={'-100'}
                onChange={e => props.onChange(new Date(e.target.value))}
            />
            {
                pickVisible && <SingleDatepicker
                    name="date-input"
                    date={props.date}
                    onDateChange={(date) => {
                        props.onChange(date)
                        setPickVisible.off()
                    }}
                    defaultIsOpen
                    propsConfigs={{
                        inputProps: { visibility: 'hidden', pos: 'absolute' },
                        // popoverCompProps: { popoverContentProps: {  } }
                    }}
                />
            }
        </Box>
    )
}