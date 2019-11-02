<template>
	<sc-form-group v-bind="formGroupProps">
		<template>
            <div>
                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                    <div class="menubar">
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                        >
                            <icon name="Bold" img="bold"></icon>
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                        >
                            <icon name="Italic" img="italic" />
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.strike() }"
                        @click="commands.strike"
                        >
                            <icon name="Strike" img="strike" />
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                        >
                            <icon name="Underline" img="underline" />
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.code() }"
                        @click="commands.code"
                        >
                            <icon name="Code" img="code" />
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.paragraph() }"
                        @click="commands.paragraph"
                        >
                            <icon name="Paragraph" img="paragraph" />
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                        >
                            H1
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                        >
                            H2
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })"
                        >
                            H3
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                        >
                            <icon name="Unorderd list" img="ul" />
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                        >
                            <icon name="Orderd list" img="ol" />
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote"
                        >
                            <icon name="Quote" img="quote" />
                        </button>
                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.code_block() }"
                        @click="commands.code_block"
                        >
                            <icon name="Code" img="code" />
                        </button>
                        <button
                        class="menubar__button"
                        @click="commands.horizontal_rule"
                        >
                            <icon name="Horizontal rule" img="hr" />
                        </button>
                        <button
                        class="menubar__button"
                        @click="commands.undo"
                        >
                            <icon name="Undo" img="undo" />
                        </button>
                        <button
                        class="menubar__button"
                        @click="commands.redo"
                        >
                            <icon name="Redo" img="redo" />
                        </button>
                    </div>
                </editor-menu-bar>
                <editor-content :editor="editor" :class="getFieldCssClass" :disabled="isDisabled" />
            </div>
		</template>
		<template slot="append">
			<slot name="append"></slot>
		</template>
	</sc-form-group>
</template>

<script>
    import baseInput from "../../base/baseInput";
    import Icon from "./icon";
    import { Editor, EditorMenuBar, EditorMenuBubble, EditorContent } from 'tiptap';
    import {
        Blockquote,
        CodeBlock,
        HardBreak,
        Heading,
        HorizontalRule,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History
    } from 'tiptap-extensions';

	export default {
        mixins: [baseInput],

        components: {
            EditorContent,
            EditorMenuBar,
            EditorMenuBubble,
            Icon
        },

        data() {
            return {
                editor: new Editor({
                    extensions: [
                        new Blockquote(),
                        new BulletList(),
                        new CodeBlock(),
                        new HardBreak(),
                        new Heading({ levels: [1, 2, 3] }),
                        new HorizontalRule(),
                        new ListItem(),
                        new OrderedList(),
                        new TodoItem(),
                        new TodoList(),
                        new Link(),
                        new Bold(),
                        new Code(),
                        new Italic(),
                        new Strike(),
                        new Underline(),
                        new History()
                    ],
                })
            };
        },

        mounted() {
            // this.editor.on('init', this.setContent.bind(this));
            this.editor.on('update', this.update.bind(this));
            this.setContent();
        },

        beforeDestroy() {
            this.editor.destroy();
        },

        methods: {
            setContent(content = this.fieldValue) {
                this.editor.setContent(content);
            },

            update({getHTML}) {
                // this.emit(getHTML());
                this.fieldValue = getHTML();
            }
        },

        watch: {
            fieldValue(value) {
                this.setContent(value);
            },

            isDisabled: {
                handler(disabled) {
                    this.editor.setOptions({
                        editable: !disabled,
                    });
                },
                immediate: true
            }
        }
	}
</script>

<style scoped>
.menubar__button {
    font-weight: 700;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000;
    padding: .2rem .5rem;
    margin-right: .2rem;
    border-radius: 3px;
    cursor: pointer;
}

.form-control {
    min-height: 15rem;
}

.form-control[disabled] {
    background-color: #e9ecef;
    opacity: 1;
}
</style>
