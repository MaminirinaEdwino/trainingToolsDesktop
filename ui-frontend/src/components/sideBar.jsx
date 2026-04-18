export default function SideBar(){
    return <>
    <button type="button" class="btn btn-text max-sm:btn-square sm:hidden" aria-haspopup="dialog" aria-expanded="false" aria-controls="default-sidebar" data-overlay="#default-sidebar" >
  <span class="icon-[tabler--menu-2] size-5"></span>
</button>

<aside id="default-sidebar" class="overlay [--auto-close:sm] sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden max-w-64 sm:absolute sm:z-0 sm:flex sm:translate-x-0" role="dialog" tabindex="-1" >
  <div class="drawer-body px-2 pt-4">
    <ul class="menu p-0">
      <li>
        <a href="#">
          <span class="icon-[tabler--home] size-5"></span>
          Home
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon-[tabler--user] size-5"></span>
          Account
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon-[tabler--message] size-5"></span>
          Notifications
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon-[tabler--mail] size-5"></span>
          Email
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon-[tabler--calendar] size-5"></span>
          Calendar
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon-[tabler--shopping-bag] size-5"></span>
          Product
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon-[tabler--login] size-5"></span>
          Sign In
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon-[tabler--logout-2] size-5"></span>
          Sign Out
        </a>
      </li>
    </ul>
  </div>
</aside>
    </>
}