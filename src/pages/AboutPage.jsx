// Компонент со страницы About
import aboutImage from "../assests/images/about.jpg";

export const AboutPage = () => {
  return (
    <div className="about-content">
      <h1 className="about-title">About Horror Movie App</h1>
      <img
        className="about-image"
        src={aboutImage}
        alt="about"
      />
      <p className="about-text">
      Welcome to the ultimate horror movie app! If you're a fan of spine-chilling thrills, blood-curdling screams, and heart-pounding suspense, then this is the perfect app for you.
      </p>
      <p className="about-text">
      With our app, you can read an information about modern horror films, from supernatural and psychological thrillers to slasher and creature features. Whether you're in the mood for a ghostly haunting, a demonic possession, or a terrifying monster lurking in the shadows, we have something to satisfy every horror aficionado's craving.
      </p>
      <p className="about-text">
      Not only can you watch your favorite horror movies on the go, but you can also discover new releases, read reviews, and connect with fellow horror fans in our community forums. Get ready to experience the adrenaline rush of fear and the exhilaration of surviving a nightmarish encounter with our horror movie app. Are you brave enough to dive into the darkness?
      </p>
    </div>
  );
};
