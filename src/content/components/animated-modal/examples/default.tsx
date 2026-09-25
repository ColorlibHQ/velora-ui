import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/velora/animated-modal";

export default function AnimatedModalDemo() {
  return (
    <Modal>
      <ModalTrigger>Invite teammates</ModalTrigger>
      <ModalContent
        title="Invite your team"
        description="Teammates get access to every project in this workspace."
      >
        <div className="space-y-4 px-6 py-5">
          <label className="block space-y-1.5 text-sm font-medium">
            <span>Email addresses</span>
            <input
              type="email"
              multiple
              placeholder="ada@studio.dev, grace@studio.dev"
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm font-normal outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">
            <span>Role</span>
            <select className="h-10 w-full rounded-lg border bg-background px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <option>Editor</option>
              <option>Viewer</option>
              <option>Admin</option>
            </select>
          </label>
        </div>
        <ModalFooter>
          <ModalClose>Cancel</ModalClose>
          <ModalClose className="border-transparent bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
            Send invites
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
