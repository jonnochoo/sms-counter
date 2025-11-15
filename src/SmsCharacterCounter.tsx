import { Component, createMemo } from 'solid-js'
import { GSM7_CHARS } from './Gsm7Chars'
import Box from './Box'

type SmsCharacterCounterType = {
    text: string
}
const SmsCharacterCounter: Component<SmsCharacterCounterType> = (props) => {
    const characterCount = createMemo(() => props.text.length)

    const credits = createMemo(() => {
        const count = characterCount()
        const index = [160, 306, 459, 612].findIndex((item) => count <= item)
        return index + 1
    })

    const isGSM7 = createMemo(() => {
        const text = props.text || ''
        for (let char of text) {
            if (!GSM7_CHARS.includes(char)) {
                return false
            }
        }
        return true
    })

    return (
        <div>
            <div class="flex gap-4 mt-2">
                <Box label="Character Count" value={characterCount} />
                <Box label="Credits" value={credits} />
                <div class="p-2 bg-[#292c3c] rounded  w-full">
                    <div class="text-center font-bold">
                        <i class="fa fa-dollar" /> Type
                    </div>
                    <div
                        class={`text-4xl text-center font-bold ${isGSM7() ? 'text-green-500' : 'text-red-400'}`}
                    >
                        {isGSM7() ? 'GSM7' : 'Unicode'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmsCharacterCounter
