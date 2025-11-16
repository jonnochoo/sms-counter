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
            <div class=" bg-[#1c1c29] p-4 border  border-[hsl(236.8421,16.2393%,22.9412%)] text-xs mt-4 italic">
                * When messages exceed the single SMS limit, they're split into
                multiple parts with a small header added to each segment for
                reassembly. This header uses 7 characters in GSM-7 (reducing
                capacity from 160 to 153 per part) and 3 characters in UCS-2
                (reducing capacity from 70 to 67 per part).
            </div>
        </div>
    )
}

export default App
