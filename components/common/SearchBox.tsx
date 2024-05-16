
import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { MdClose } from "react-icons/md"
import { debounceTime, Subject, tap } from "rxjs"

export type SearchBox = {
    placeholder?: string
    onSearch?: (value?: string) => void
}

export const SearchBox = (props: SearchBox) => {

    const $value = useRef(new Subject<string>())
    const [v, u] = useState<string>('')

    useEffect(() => {
        const s = $value.current.pipe(
            tap((d) => u(d)),
            debounceTime(500)
        ).subscribe(va => {
            props.onSearch?.(va == '' ? undefined : va)
        })
        return () => s.unsubscribe()
    }, [props.onSearch])

    return (
        <InputGroup w='full' size={{base: 'sm', md: 'md'}}>
            <InputLeftElement>
                <SearchIcon />
            </InputLeftElement>
            <Input
                borderRadius='10px'
                placeholder={props.placeholder}
                value={v}
                onChange={(e) => $value.current.next(e.target.value)}
                onFocus={e => e.target.select()}
            />
            {
                v && v.length > 0 && (
                    <InputRightElement>
                        <MdClose cursor='pointer' onClick={() => {
                            u('')
                            props.onSearch?.()
                        }} />
                    </InputRightElement>
                )
            }
        </InputGroup>
    )
}