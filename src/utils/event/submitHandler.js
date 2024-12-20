import { login } from "../auth.js";
import { LoginEnum } from "../index.js";
import { setItem } from "../../store/localStorage.js";

export const submitHandler = (event, type = "popstate") => {
  event.preventDefault();

  const form = event.target;
  if (form.getAttribute("id") === "login-form") {
    const formData = new FormData(form);
    const userInfo = {
      username: formData.get(LoginEnum.ID),
      passwd: formData.get(LoginEnum.PASSWORD),
    };

    login(userInfo.username, userInfo.passwd, type);
  }

  if (form.getAttribute("id") === "profile-form") {
    const formData = new FormData(form);
    const updatedUserInfo = {
      username: formData.get(LoginEnum.ID),
      email: formData.get(LoginEnum.EMAIL),
      bio: formData.get(LoginEnum.BIO),
    };

    setItem(LoginEnum.LOGIN_TOKEN, updatedUserInfo);
  }
};
