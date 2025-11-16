import { createSignal, For, Show } from 'solid-js'
import SmsCharacterCounter from './SmsCharacterCounter'
import { onMount } from 'solid-js'

export default function SmsTemplateComponent() {
    const [text, setText] = createSignal('')
    const [fields, setFields] = createSignal([])
    let textareaRef

    const update = () => {
        const state = template(textareaRef.value, fields())
        setText(state.text)
        setFields(state.fields)

        // Update query string
        const params = new URLSearchParams(window.location.search)
        if (textareaRef.value) {
            params.set('message', textareaRef.value)
        } else {
            params.delete('message')
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.replaceState({}, '', newUrl)
    }

    const handleInputChange = (e) => {
        const fieldName = e.target.getAttribute('name')
        console.log(fieldName, fields(), e.target.value)
        const newFields = fields().find((x) => x.name === fieldName)
        newFields.value = e.target.value
        update()
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search)
        const templateParam = params.get('message')
        if (templateParam && textareaRef) {
            textareaRef.value = templateParam
            update()
        }
    })

    return (
        <div class="flex gap-4">
            <div class="w-1/3">
                <div class="bg-[#b997e1] rounded p-2 rounded-b-none ">
                    Enter your SMS wording
                </div>
                <textarea
                    rows="5"
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
                                onBlur={handleInputChange}
                                class="p-2 border border-gray-400 rounded-lg rounded-t-none w-full"
                            />
                        </div>
                    )}
                </For>
            </div>
            <div class="w-1/3">
                <Show
                    when={text().length > 0}
                    fallback={<div>No message has been entered yet..</div>}
                >
                    <pre class="p-4 bg-[#292c3c] whitespace-pre-wrap overflow-hidden rounded-2xl border-2 border-slate-950">
                        <p class="wording">{text()}</p>
                    </pre>
                </Show>
            </div>
            <div class="w-1/3">
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
        date: 'Wednesday, 21st September 2025',
        rego: 'TEST001',
        make: 'vehicle',
    }
    var field = Object.keys(values).find((item) =>
        fieldName.toLowerCase().includes(item)
    )

    return field ? values[field] : 'Sir/Madam'
}
