import FlipCard from './components/FlipCard/FlipCard';
import { galleryImages } from './galleryData';

function FoodImage({ item }) {
  return (
    <div className="food-card-front">
      <img
        src={item.url}
        alt={item.caption}
        loading="lazy"
        draggable="false"
        onError={event => {
          if (event.currentTarget.src !== item.fallback) event.currentTarget.src = item.fallback;
        }}
      />
      <div className="food-card-front-vignette" aria-hidden="true" />
      <div className="food-card-front-meta">
        <span>{item.category}</span>
        <strong>{item.caption}</strong>
      </div>
      <div className="food-card-flip-hint"><span>drag / tap</span><b>↻</b></div>
    </div>
  );
}

function FoodBack({ item, index }) {
  return (
    <div className="food-card-back">
      <div className="food-back-orb food-back-orb-a" />
      <div className="food-back-orb food-back-orb-b" />
      <div className="food-back-noise" />
      <div className="food-back-top">
        <span>THE SAVORY BAR</span>
        <b>{String(index + 1).padStart(2, '0')}</b>
      </div>
      <div className="food-back-copy">
        <small>{item.category}</small>
        <h3>{item.caption}</h3>
        <p>{item.note}</p>
      </div>
      <div className="food-back-bottom">
        <span>Savor. Share. Celebrate.</span>
        <strong>drag or tap to return ↻</strong>
      </div>
    </div>
  );
}

export default function GalleryFlipCards() {
  return (
    <>
      {galleryImages.map((item, index) => (
        <div className="food-flip-cell" key={item.caption} style={{ '--food-delay': `${index * 45}ms` }}>
          <FlipCard
            front={<FoodImage item={item} />}
            back={<FoodBack item={item} index={index} />}
            axis="y"
            flipOnClick
            draggable
            dragDistance={0}
            tilt
            tiltMax={12}
            glare
            glareOpacity={0.22}
            hoverScale={1.03}
            perspective={1100}
            stiffness={170}
            damping={20}
            width={420}
            height={500}
            radius={28}
            background="rgba(18, 13, 10, 0.84)"
            color="#fff6e8"
            shadow
            shadowColor="#000000"
            shadowOpacity={0.45}
            ariaLabel={`Flip ${item.caption} card`}
            className="food-flip-card"
          />
        </div>
      ))}
    </>
  );
}
