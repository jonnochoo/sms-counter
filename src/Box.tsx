import type { Component } from 'solid-js'

type BoxProps = {
    label: string
    value: string
    class: string
    icon?: Component<LucideProps>
}
const Box: Component<BoxProps> = (props) => {
    return (
        <div class="p-2 bg-[#292c3c] rounded w-full">
            <div class="text-center font-bold">
                {props.icon && (
                    <props.icon size={16} class="inline mr-1 mb-1" />
                )}
                {props.label}
            </div>
            <div
                class={`text-4xl text-center font-bold ${props.class ? props.class : ''}`}
            >
                {props.value}
            </div>
        </div>
    )
}

export default Box
