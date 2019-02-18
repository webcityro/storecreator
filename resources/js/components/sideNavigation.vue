<template>
    <ul id="menu">
        <scSideNavItem v-if="Auth.can('read-users|read-acl')" :label="trans('generic.users')" :extended="extend" icon="fa fa-user fa-fw">
            <scSideNavItem v-if="Auth.can('read-users')" :label="trans('user.accountsTitle')" :url="laroute.route('users.index')"></scSideNavItem>
            <scSideNavItem v-if="Auth.can('read-acl')" :label="trans('permission.title')" :url="laroute.route('permissions.index')"></scSideNavItem>
            <scSideNavItem v-if="Auth.can('read-acl')" :label="trans('role.title')" :url="laroute.route('roles.index')"></scSideNavItem>
        </scSideNavItem>
        <scSideNavItem v-if="Auth.can('read-categories')" :label="trans('generic.categories')" :extended="extend" icon="fa fa-folder-open fa-fw"></scSideNavItem>
        <scSideNavItem v-if="Auth.can('read-attributes|read-attribute-groups|read-templates')" :label="trans('generic.attributes')" :extended="extend" icon="fa fa-tags fa-fw">
            <scSideNavItem v-if="Auth.can('read-attribues')" :label="trans('generic.attributes')" url=""></scSideNavItem>
            <scSideNavItem v-if="Auth.can('read-attribue-groups')" :label="trans('generic.attributeGroups')" url=""></scSideNavItem>
            <scSideNavItem v-if="Auth.can('read-templates')" :label="trans('generic.templates')" url=""></scSideNavItem>
        </scSideNavItem>
        <scSideNavItem v-if="Auth.can('read-products|read-products-from-feeds|read-added-price')" :label="trans('generic.products')" :extended="extend" icon="fa fa-box fa-fw">
            <scSideNavItem v-if="Auth.can('read-products')" :label="trans('generic.products')" url=""></scSideNavItem>
            <scSideNavItem v-if="Auth.can('read-products-from-feeds')" :label="trans('generic.productsFromFeeds')" url=""></scSideNavItem>
            <scSideNavItem v-if="Auth.can('read-added-price')" :label="trans('generic.addedPrice')" url=""></scSideNavItem>
        </scSideNavItem>
        <scSideNavItem v-if="Auth.can('read-stores')" :label="trans('generic.system')" :extended="extend" icon="fa fa-cog fa-fw">
            <scSideNavItem v-if="Auth.can('read-stores|read-units-of-measurement|read-mapping|read-errors')" :label="trans('generic.stores')" url=""></scSideNavItem>
            <scSideNavItem v-if="Auth.can('read-units-of-measurement')" :label="trans('generic.unitsOfMeasurement')" url=""></scSideNavItem>
            <scSideNavItem v-if="Auth.can('read-mapping')" :label="trans('generic.mapping')" url=""></scSideNavItem>
            <scSideNavItem v-if="Auth.can('read-errors')" :label="trans('generic.errors')" url=""></scSideNavItem>
        </scSideNavItem>
    </ul>
</template>

<script>
    import SideNavItem from './sideNavItem.vue';

    export default {
        components: {
            scSideNavItem: SideNavItem
        },

        data() {
            return {

            };
        },

        mounted() {

        },

        computed: {
            extend() {
                return this.$parent.expendSideNavbar;
            }
        }
    }
</script>
