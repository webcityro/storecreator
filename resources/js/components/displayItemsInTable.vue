<template>
    <b-table :fields="fields" :items="dataItems" striped bordered hover outlined v-if="dataItems.length > 0">
        <template slot="id" slot-scope="data">
            <slot name="id" :row="data"><span class="th">{{data.value}}</span></slot>
        </template>
        <template v-for="(label, key) in columns" :slot="key" slot-scope="data">
            <slot :name="key" :row="data">{{data.value}}</slot>
        </template>
        <template slot="actions" slot-scope="data">
            <slot name="actions" :row="data"></slot>
        </template>
    </b-table>
    <b-col v-else>
        <h3 class="text-center" v-text="noresoults"></h3>
    </b-col>
</template>

<style>
    .th { font-weight: bolder; }
</style>

<script>
    export default {
        props: {
            columns: { required: true, type: Object },
            items: { required: true, type: Object },
            noresoults: { required: true }
        },

        data() {
            return {
                fields: [],
                dataItems: [],
                itemsPerPage: 10
            };
        },

        mounted() {
            this.fields.push({ key: 'id', label: trans('generic.id')});
            this.dataItems = this.items.data;
            this.itemsPerPage = this.items.per_page;

            for (let i in this.columns) {
                this.fields.push({ key: i, label: this.columns[i]});
            }

            this.fields.push({ key: 'actions', label: trans('generic.actions')});

            window.Event.emit('scItemsPerPage', this.itemsPerPage);

            this.Event.on('scFilteredItems', items => {
                this.dataItems = items.data;
                this.Event.emit('scPaginate', items);
            });

            window.Event.on('scGetItem', index => {
                window.Event.emit('scReceveItem', this.dataItems[index]);
            });

            window.Event.on('scUpdateDisplayRow', row => {
                for (let i in row.data) {
                    if (typeof this.dataItems[row.index][i] !== 'undefined') {
                        this.dataItems[row.index][i] = row.data[i];
                    }
                }
            });

            window.Event.on('scAddDisplayRow', row => {
                if (!isNaN(Object.keys(row)[0])) {
                    for (let i in row) {
                        this.dataItems.unshift(row[i]);
                    }
                } else {
                    this.dataItems.unshift(row);
                }

                if (this.dataItems.length > this.itemsPerPage) {
                    this.dataItems = this.dataItems.slice(0, this.itemsPerPage);
                }
            });

            window.Event.on('scChangePaginate', perPage => {
                this.itemsPerPage = perPage;
            });

            window.addEventListener("load", event => {
                this.Event.emit('scPaginate', this.items);
            });
        }
    }
</script>
