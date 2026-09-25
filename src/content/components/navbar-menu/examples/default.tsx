import { MenuItem, NavbarMenu } from "@/components/velora/navbar-menu";

export default function NavbarMenuDemo() {
  return (
    <NavbarMenu>
      <MenuItem label="Product">
        <ul className="flex w-40 flex-col gap-1 text-sm">
          <li>
            <a href="#components" className="text-muted-foreground hover:text-foreground">
              Components
            </a>
          </li>
          <li>
            <a href="#themes" className="text-muted-foreground hover:text-foreground">
              Themes
            </a>
          </li>
        </ul>
      </MenuItem>
      <MenuItem label="Docs" href="#docs" />
      <MenuItem label="Pricing" href="#pricing" />
    </NavbarMenu>
  );
}
