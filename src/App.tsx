import type { Component } from 'solid-js'
import SmsTextBox from './SmsTextBox'
import { Calculator } from 'lucide-solid'

const App: Component = () => {
    return (
        <div class="container m-auto font-[Montserrat] bg-[#1c1c29] p-8 border  border-[hsl(236.8421,16.2393%,22.9412%)] rounded">
            <h1 class="text-4xl mb-4 font-bold text-[#bcc4e1]">
                <Calculator class="inline" size={32} /> SMS Counter
            </h1>
            <SmsTextBox />
        </div>
    )
}

export default App
