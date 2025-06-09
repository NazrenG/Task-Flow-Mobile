import GifImage from "@/components/Image/Image";


export default function Onboarding() {
  return (
      <>
          <GifImage source={require("@/assets/gif/welcome.gif")} // öz yoluna görə dəyiş
        style={{ width: 200, height: 200 }}/>
      
      <GifImage source={require("@/assets/gif/welcome.gif")} // öz yoluna görə dəyiş
        style={{ width: 200, height: 200 }}/>
      </>
  );
}
