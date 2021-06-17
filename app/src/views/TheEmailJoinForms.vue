<template>
  <div id="theEmailJoinForms">
    <div class="email-join-forms-wrap">
      <VmainLinkLogo />
      <div class="email-join-forms-box">
        <h3>회원가입</h3>
        <form class="email-join-forms">
          <div class="int-area-wrap">
            <label for="id">이메일</label>
            <div class="int-area">
              <input
                v-model="id"
                placeholder="example@gmail.com"
                type="email"
                name="id"
                id="id"
                autofocus
                autocomplete="on"
                required
                @blur="emailTest()"
              />
            </div>
            <p v-show="subIdActive" class="int-sub">
              {{ subIdCheckText }}
            </p>
          </div>
          <div class="int-area-wrap">
            <label for="pw">비밀번호</label>
            <div class="int-area">
              <input
                v-model="pw"
                placeholder="8자 이상 영문/숫자/특수문자 중 2가지 포함"
                type="password"
                name="pw"
                id="pw"
                autocomplete="off"
                required
                @blur="pwTest()"
              />
            </div>
            <p v-show="subPwActive" class="int-sub">
              총 8자 이상, 영문/숫자/특수문자 중 2가지 이상 입력해주세요.
            </p>
          </div>
          <div class="int-area-wrap">
            <label for="pw-con">비밀번호 확인</label>
            <div class="int-area">
              <input
                v-model="pwcon"
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                type="password"
                name="pw-con"
                id="pw-con"
                autocomplete="off"
                required
                @blur="pwDupTest()"
              />
            </div>
            <p v-show="subPasswordCheck" class="int-sub">
              비밀번호가 일치하지 않습니다.
            </p>
          </div>

          <button
            :disabled="disabledActive"
            type="submit"
            class="btn-next"
            @click="emailCheckClick"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VmainLinkLogo from "../components/VmainLinkLogo";
import { authSendEmail, emailCheckApiCall } from "../assets/api/register";
export default {
  data() {
    return {
      id: [],
      pw: [],
      pwcon: [],
      subIdActive: false,
      subIdCheckText: "이메일 형태가 올바르지 않습니다.",
      subPwActive: false,
      subPasswordCheck: false,
    };
  },
  computed: {
    disabledActive: function () {
      if (
        this.id.length > 1 &&
        this.pw.length > 1 &&
        this.pwcon.length > 1 &&
        !this.subIdActive &&
        !this.subPwActive &&
        !this.subPasswordCheck
      ) {
        return false;
      } else {
        return true;
      }
    },
    reqData() {
      return { email: this.id, pwd: this.pw };
    },
  },
  components: {
    VmainLinkLogo,
  },
  methods: {
    asyncemailCheckClick() {
      await this.emailTest();
      await this.pwTest();
      await this.pwDupTest();
      if (
        this.id.length > 1 &&
        this.pw.length > 1 &&
        this.pwcon.length > 1 &&
        !this.subIdActive &&
        !this.subPwActive &&
        !this.subPasswordCheck
      ) {
        authSendEmail(this.id).then(() => {
          this.$router.push({
            name: "email-join-verification",
            params: {
              ...this.reqData,
            },
          });
        });
      }
      // this.$store.dispatch("CALL_REGISTER", this.reqData);
    },
    async emailTest() {
      const regExp =
        /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

      if (this.id.length >= 1) {
        const resultCheck = await emailCheckApiCall(this.id).then((res) => {
          return res.data.message;
        });
        this.subIdActive = regExp.test(this.id) ? false : true;
        if (resultCheck == "exist") {
          this.subIdCheckText = "이메일이 이미 존재합니다.";
          this.subIdActive = true;
        } else {
          this.subIdCheckText = "이메일 형태가 올바르지 않습니다.";
        }
      } else this.subIdActive = false;
    },
    pwTest() {
      var regExp = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
      if (this.pw.length >= 1)
        this.subPwActive = regExp.test(this.pw) ? false : true;
      else this.subPwActive = false;
      this.pwDupTest();
    },
    pwDupTest() {
      if (this.pwcon.length >= 1)
        this.subPasswordCheck = this.pw === this.pwcon ? false : true;
      else this.subPwActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#theEmailJoinForms {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(250, 250, 250);
}

.email-join-forms-wrap {
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
}

.main-link-logo {
  width: 8.25rem;
  height: 2.75rem;
  fill: #816bff;
  margin-bottom: 2.25rem;
}

.email-join-forms-box {
  width: 100%;
  height: auto;
  background: #fff;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 0.25rem;
  padding: 2rem;
  h3 {
    height: 1.5rem;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.5rem;
  }
}

.email-join-forms {
  margin-top: 1.5rem;
}

.int-area-wrap {
  position: relative;
  margin-top: 1rem;
  &:nth-child(2) {
    margin-top: 1rem;
  }
  display: flex;
  flex-direction: column;
  label {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: rgb(80, 80, 80);
  }
  .int-area {
    margin: 0.5rem 0 1.5rem;
    border-bottom: 1px solid rgb(238, 238, 238);
    padding-bottom: 0.5rem;
    input {
      border: none;
      outline: none;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 500;
      letter-spacing: -0.0375rem;
      color: rgb(18, 18, 18);
      caret-color: rgb(129, 107, 255); //수정
      &::placeholder {
        color: #cfcfcf;
      }
    }
  }
}
.int-sub {
  position: absolute;
  bottom: 0.4rem;
  font-size: 0.7rem;
  color: red;
}

.find-pw-link {
  margin-top: 0.5rem;
  text-align: right;
  a {
    color: rgb(138, 138, 138);
    font-size: 0.875rem;
    line-height: 1.5rem;
    text-decoration-line: underline;
    letter-spacing: -0.025rem;
  }
}

.btn-next {
  margin-top: 2rem;
  background: #816bff;
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  color: #fff;
  border-radius: 0.25rem;
  border: none;
  outline: none;
  transition: all 0.08s ease-in 0s;
  &:hover {
    background: #6e58ff;
  }
  &:disabled {
    background: #e2e2e2;
  }
}

// tablet
@media screen and (max-width: 1024px) {
  .email-join-forms-wrap {
    width: 100%;
    margin: 0 1rem;
  }
}
</style>
