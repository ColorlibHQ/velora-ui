import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/velora/animated-modal";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=70&auto=format&fit=crop",
    alt: "Turquoise water lapping a white sand beach",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=70&auto=format&fit=crop",
    alt: "Mountain ridges above a sea of clouds at sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=70&auto=format&fit=crop",
    alt: "A calm lake reflecting pine-covered mountains",
  },
];

const details = [
  ["Dates", "12 – 19 Oct"],
  ["Guests", "2 adults"],
  ["Stay", "Seaview villa"],
  ["Flights", "Included"],
];

export default function AnimatedModalBookTripDemo() {
  return (
    <Modal>
      <ModalTrigger className="h-11 rounded-full bg-linear-to-r from-brand-from via-brand-via to-brand-to px-6 text-brand-foreground">
        Book your trip
      </ModalTrigger>
      <ModalContent
        title="Seven days on the coast"
        description="Beaches, a sunrise hike and a lake day — all planned for you."
        className="max-w-xl"
      >
        <div className="grid grid-cols-3 gap-2 px-6 pt-5">
          {photos.map((photo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async"
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className={
                i === 1
                  ? "aspect-3/4 w-full -rotate-2 rounded-xl bg-muted object-cover shadow-lg"
                  : "aspect-3/4 w-full rotate-2 rounded-xl bg-muted object-cover shadow-lg"
              }
            />
          ))}
        </div>
        <dl className="grid grid-cols-2 gap-3 px-6 py-5 sm:grid-cols-4">
          {details.map(([term, value]) => (
            <div key={term} className="rounded-lg bg-muted/60 px-3 py-2">
              <dt className="text-xs text-muted-foreground">{term}</dt>
              <dd className="text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <ModalFooter className="justify-between">
          <p className="text-sm">
            <span className="text-lg font-semibold">$1,480</span>
            <span className="text-muted-foreground"> / person</span>
          </p>
          <div className="flex gap-2">
            <ModalClose>Not now</ModalClose>
            <ModalClose className="border-transparent bg-brand text-brand-foreground hover:bg-brand/90 hover:text-brand-foreground">
              Book now
            </ModalClose>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
