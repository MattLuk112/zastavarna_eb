<template>
    <div>
        <!-- Checkbox -->
        <div class="border-b border-gray-200 pt-2 px-4">
            <h2 class="text-2xl font-bold py-2">Checkbox</h2>
            <div class="pb-4">
                <base-checkbox
                    v-model="preview.baseCheckbox"
                ></base-checkbox>
            </div>
        </div>

        <!-- On/Off -->
        <div class="border-b border-gray-200 pt-2 px-4">
            <h2 class="text-2xl font-bold py-2">On/Off</h2>
            <div class="pb-4">
                <base-on-off
                    v-model="preview.baseOnOff"
                ></base-on-off>
            </div>
        </div>

        <!-- Password -->
        <div class="border-b border-gray-200 pt-2 px-4">
            <h2 class="text-2xl font-bold py-2">Password</h2>
            <div class="pb-4">
                <base-password
                    v-model="preview.basePasswordModel"
                    placeholder="Password"
                ></base-password>
            </div>
        </div>

        <!-- Select -->
        <div class="border-b border-gray-200 pt-2 px-4">
            <h2 class="text-2xl font-bold py-2">Select</h2>
            <div class="pb-4">
                <base-select
                    placeholder="Značka"
                    v-model="preview.baseSelectModel"
                    :options="[
                        {
                            label: 'Ford',
                            value: 'ford'
                        },
                        {
                            label: sampleLabelFunction,
                            value: sampleValueFunction
                        },
                        {
                            label: 'Trucks',
                            children: [
                                {
                                    label: 'MAN',
                                    value: 'man'
                                },
                                {
                                    label: 'Caterpillar',
                                    value: 'caterpillar'
                                },
                                {
                                    label: 'Midwest Automotive',
                                    value: sampleChildValueFunction
                                }
                            ]
                        }
                    ]"
                ></base-select>
            </div>
        </div>

        <!-- Dropdown -->
        <div class="border-b border-gray-200 pt-2 px-4">
            <h2 class="text-2xl font-bold py-2">Dropdown</h2>
            <div class="pb-4">
                <base-dropdown>
                    <div
                    class="
                        relative
                        inline-flex 
                        items-center 
                        px-4 
                        py-2 
                        text-sm 
                        font-medium 
                        leading-5 
                        text-gray-700 
                        bg-white border 
                        border-gray-400 
                        rounded-md group 
                        hover:text-gray-900 
                        focus:outline-none 
                        focus:text-gray-900 
                        focus:border-gray-500 
                        hover:border-gray-500
                        select-none	
                    "
                    >
                        <icon-sort-descending></icon-sort-descending>
                        Řazení
                    </div>
                    <template v-slot:content>
                        <div class="py-1 px-4">
                            <div
                                class="bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer -mx-4 px-3 py-1 text-sm"
                            >
                                Název A-Z
                            </div>
                            <div
                                class="bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer -mx-4 px-3 py-1 text-sm"
                            >
                                Název Z-A
                            </div>
                            <div
                                class="bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer -mx-4 px-3 py-1 text-sm"
                            >
                                Nejlevnější
                            </div>
                            <div
                                class="bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer -mx-4 px-3 py-1 text-sm"
                            >
                                Nejdražší
                            </div>
                        </div>
                    </template>
                </base-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup() {
        const preview = reactive({
            baseCheckbox: false,
            baseOnOff: false,
            basePasswordModel: null,
            baseSelectModel: null
        })

        const sampleLabelFunction = function() {
            const variable = 'Benz';
            return `Mercedes-${variable}`
        }

        const sampleValueFunction = function() {
            const variable = 'benz';
            return `mercedes-${variable}`
        }

        const sampleChildValueFunction = function() {
            const variable = 'automotive';
            return `midwest-${variable}`
        }

        return {
            preview,
            sampleLabelFunction,
            sampleValueFunction,
            sampleChildValueFunction
        }
    }
}
</script>