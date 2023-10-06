import { Carousel } from "@material-tailwind/react";

export default function Example() {
  return (
    <>
      <Carousel className="h-[700px]">
      <img
        src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg"
        className="h-full w-full object-cover"
      />
      <img
       src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
    </>
  );
}
