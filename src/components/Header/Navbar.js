import { getItem } from "../../store/localStorage.js";

export const Navbar = () => {
  const user = getItem("user");
  const logoutButton = `<li><a href="#" id='logout' class="text-gray-600">로그아웃</a></li>`;
  const loginButton = `<li><a href="/login" id='login' class="text-gray-600">로그인</a></li>`;
  const profile = `<li><a href="/profile" class="text-gray-600">프로필</a></li>`;

  return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600 font-bold" role="link">홈</a></li>
           ${user ? profile : ""}
          ${user ? logoutButton : loginButton}
        </ul>
      </nav>
`;
};
