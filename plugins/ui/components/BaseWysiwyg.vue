<template>
    <div 
        ref="editor"
        :style="{
            minHeight: '100px',
            maxHeight: '200px',
            overflowY: 'auto'
        }"
    >
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import Quill from 'quill';

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

export default defineComponent({
    name: 'BaseWysiwyg',

    emits: ['update:modelValue'],

    props: {
        modelValue: String,
    },

    setup(props, { emit }) {
        
        const editor = ref(null);
        let quill = null;

        const defaults = {
            theme: 'snow',
            // boundary: document.body,
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link', 'image', 'video']
                ]
            },
            placeholder: 'Insert text here ...',
            readOnly: false
        };

        const onInput = (event) => {
            emit('update:modelValue', event.target.value);
        }

        const initialize = function() {
            if (editor) {
                quill = new Quill(editor.value, defaults)
            }
        }

        onMounted(() => {
            initialize();
        })

        return {
            editor,
            onInput
        }
    }
});
</script>