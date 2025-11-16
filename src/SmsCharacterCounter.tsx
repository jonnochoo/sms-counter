import { Component, createMemo } from 'solid-js'
import { GSM7_CHARS } from './Gsm7Chars'
import Box from './Box'
import {
    BadgeDollarSign,
    Blocks,
    CircleDollarSign,
    DollarSignIcon,
    FileText,
    FileTextIcon,
    Pilcrow,
    Tally3,
    Tally5,
    Text,
    TextIcon,
} from 'lucide-solid'

type SmsCharacterCounterType = {
    text: string
}
const SmsCharacterCounter: Component<SmsCharacterCounterType> = (props) => {
    const characterCount = createMemo(() => props.text.length)

    const credits = createMemo(() => {
        const count = characterCount()
        if (count === 0) return 0

        if (isGSM7()) {
            // GSM7: 160 chars for 1 SMS, then 153 chars per additional SMS
            if (count <= 160) return 1
            return Math.ceil((count - 160) / 153) + 1
        } else {
            // Unicode: 70 chars for 1 SMS, then 67 chars per additional SMS
            if (count <= 70) return 1
            return Math.ceil((count - 70) / 67) + 1
        }
    })

    const hasText = createMemo(() => {
        return props.text.length > 0
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
                <Box
                    label="Character Count"
                    value={characterCount}
                    class={!hasText() ? 'text-gray-500' : 'text-white'}
                    icon={Tally5}
                />
                <Box
                    label="Segments"
                    value={credits}
                    class={
                        !hasText()
                            ? 'text-gray-500'
                            : credits() === 1
                              ? 'text-green-400'
                              : credits() === 2
                                ? 'text-yellow-400'
                                : 'text-red-400'
                    }
                    icon={Blocks}
                />
                <Box
                    label="Encoding Used"
                    value={isGSM7() ? 'GSM7' : 'UCS-2'}
                    class={
                        !hasText()
                            ? 'text-gray-500'
                            : isGSM7()
                              ? 'text-green-400'
                              : 'text-red-400'
                    }
                    icon={Pilcrow}
                />
            </div>
        </div>
    )
}

export default SmsCharacterCounter
