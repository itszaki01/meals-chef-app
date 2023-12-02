import "./SingleImageInput.scss";
import { useRef } from "react";
import defaultMealImg from "/src/assets/defaultMealImg.jpg";
import error404Image from "/src/assets/wrongUrlImage.jpg";
type SingleImageInputProps = {
    source: {
        mealPicture: string;
    };
    width?: string;
    height?: string;
    errorPargId: string;
};
export default function SingleImageInput({ source, width = "70px", height = "70px", errorPargId }: SingleImageInputProps) {
    const imageThumbRef = useRef<HTMLImageElement>(null);
    const ImageThumbRgx: RegExp = /(https?:\/\/.*\.(?:png|jpg|gif))/;

    //Validation For Url is Correct
    if (ImageThumbRgx.test(source.mealPicture)) {
        if (imageThumbRef.current) {
            imageThumbRef.current.src = source.mealPicture;
        }
    } else {
        if (imageThumbRef.current) {
            imageThumbRef.current.src = defaultMealImg;
        }
    }
    //handleImageError
    function handleImageError() {
        if (imageThumbRef.current) {
            imageThumbRef.current.src = error404Image;
        }
    }

    //Fetch Test Logic
    if (imageThumbRef.current) {
        const inputElement: HTMLElement | null = document.getElementById(errorPargId);
        imageThumbRef.current
            .decode()
            .then(() => {
                if (inputElement) {
                    inputElement.innerHTML = "";
                }
            })
            .catch(() => {
                if (inputElement) {
                    inputElement.innerHTML = "Wrong Image Url";
                }
            });
    }
    return (
        <>
            <img src={defaultMealImg} alt="" width={width} height={height} ref={imageThumbRef} onError={handleImageError} />
        </>
    );
}
