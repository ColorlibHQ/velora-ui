import { MenuItem, NavbarMenu } from "@/components/velora/navbar-menu";

export default function NavbarMenuDemo() {
  return (
    <NavbarMenu>
      <MenuItem label="Product">
        <p className="w-40 text-sm text-muted-foreground">Components, themes</p>
      </MenuItem>
      <MenuItem label="Docs" />
      <MenuItem label="Pricing" />
    </NavbarMenu>
  );
}
