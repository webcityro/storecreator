<template>
    <div class="paginationWrap">
        <b-pagination size="md" align="center" :total-rows="totalRows" v-model="currentPage" :per-page="perPage" @change="changePage" v-if="totalRows > perPage"></b-pagination>
        <i class="fas fa-spinner loadingPagination" v-if="loaderLeftOffset > 0" :style="'left: '+loaderLeftOffset+'px; background-color: '+loaderBackground+'; color: '+loaderColor"></i>
    </div>
</template>

<style>
    .paginationWrap {
        position: relative;
    }

    .paginationWrap > .loadingPagination {
        position: absolute;
        top: 8px;
        width: 12px;
        height: 12px;
        text-align: center;
        border-radius: 100%;
        background-color: #3490dc;
        z-index: 2;
    }

    .paginationWrap > .page-link > * {
        pointer-events: none;
    }
</style>

<script>
    export default {
        data() {
             return {
                totalRows: 0,
                currentPage: 1,
                perPage: 10,
                url: '',
                paginationWrap: '',
                loaderLeftOffset: 0,
                loaderColor: '',
                loaderBackground: ''
             }
        },

        methods: {
            changePage(page) {
                this.Event.emit('scPaginationChanged', page);
            }
        },

        mounted() {
            window.addEventListener('load', e => {
                this.paginationWrap = document.getElementsByClassName('paginationWrap')[0];

                this.paginationWrap.addEventListener('click', ev => {
                    if (!ev.target.classList.contains('page-link')) { return; }

                    this.loaderLeftOffset = (ev.target.offsetLeft - ev.target.parentElement.parentElement.offsetLeft) + ((ev.target.offsetWidth - 12) / 2);
                    this.loaderColor = !ev.target.firstElementChild ? '#ffffff' : '#3490dc';
                    this.loaderBackground = !ev.target.firstElementChild ? '#3490dc' : '#ffffff';
                });
            });

            this.Event.on('scPaginate', data => {
                this.totalRows = parseInt(data.total);
                this.currentPage = parseInt(data.current_page);
                this.perPage = parseInt(data.per_page);
                this.url = data.path;
                this.loaderLeftOffset = 0;
            });
        }
    }
</script>
