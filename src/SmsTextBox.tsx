import { createSignal, For, Show } from 'solid-js'
import SmsCharacterCounter from './SmsCharacterCounter'
import { onMount } from 'solid-js/types/server/reactive.js'

export default function SmsTemplateComponent() {
    const [text, setText] = createSignal('')
    const [fields, setFields] = createSignal([])
    let textareaRef

    const update = () => {
        const state = template(textareaRef.value, fields())
        setText(state.text)
        setFields(state.fields)
    }

    const handleInputChange = (e) => {
        const fieldName = e.target.getAttribute('name')
        setFields((prevFields) =>
            prevFields.map((item) =>
                item.name === fieldName
                    ? { ...item, value: e.target.value }
                    : item
            )
        )
        update()
    }

    return (
        <div class="flex gap-4">
            <div class="w-1/3">
                <div class="bg-[#b997e1] rounded p-2 rounded-b-none ">
                    Enter your SMS wording
                </div>
                <textarea
                    rows="2"
                    onInput={update}
                    ref={textareaRef}
                    class="p-2 border border-gray-400 rounded-lg rounded-t-none w-full"
                ></textarea>
                <For each={fields()}>
                    {(item) => (
                        <div>
                            <label class="block">{item.name}</label>
                            <input
                                type="text"
                                name={item.name}
                                value={item.value}
                                onInput={handleInputChange}
                                class="p-2 border border-gray-400 rounded-lg rounded-t-none w-full"
                            />
                        </div>
                    )}
                </For>
            </div>
            <div class="w-2/3">
                <Show
                    when={text().length > 0}
                    fallback={<div>No message has been entered yet..</div>}
                >
                    <div class="p-4 bg-[#292c3c] rounded w-full">
                        <p class="wording">{text()}</p>
                    </div>
                </Show>
                <SmsCharacterCounter text={text()} />
            </div>
        </div>
    )
}

const template = function (template, fields) {
    var match
    var regex = /#{[^#}]+}/g
    var text = template
    var newFields = []
    while ((match = regex.exec(template))) {
        var m = match[0]
        var fieldName = m
            .replace('#{', '')
            .replace('}', '')
            .replace('record.', '')
        var field = fields.find((x) => {
            return x.name === fieldName
        })
        var newValue = field ? field.value : fieldDictionary(fieldName)
        newFields.push({ name: fieldName, value: newValue })
        text = text.replace(m, newValue)
    }
    return {
        template: template,
        text: text,
        fields: newFields,
    }
}
const fieldDictionary = function (fieldName: string) {
    var values = {
        date: 'Wednesday, 21st September 2016',
        rego: 'TEST001',
        make: 'vehicle',
    }
    var field = Object.keys(values).find((item) =>
        fieldName.toLowerCase().includes(item)
    )

    return field ? values[field] : 'Sir/Madam'
}
