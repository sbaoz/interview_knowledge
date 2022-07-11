import Vue from 'vue';
import { config } from '@vue/test-utils';

Vue.config.productionTip = false;

// 注入global对象
config.provide.GLOBAL = {
    logined: false,
};
