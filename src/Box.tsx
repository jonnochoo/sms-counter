import type { Component } from 'solid-js'

type BoxProps = {
    label: string
    value: string
}
const Box: Component<BoxProps> = (props) => {
    return (
        <div class="p-2 bg-[#292c3c] rounded w-full">
            <div class="text-center font-bold">
                <i class="fa fa-dollar" /> {props.label}
            </div>
            <div class="text-4xl text-center font-bold">{props.value}</div>
        </div>
    )
}

export default Box
