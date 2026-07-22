export default function BookPageCardSkeleton() {
  return (
    <div className="book__page__row">
      <audio></audio>

      <div className="book__page__container">
        <div className="book__page__inner__wrapper">
          <div className="book__page__inner__book">

            {/* Title */}
            <div className="book__page__skeleton book__page__skeleton__text-lg"></div>

            {/* Author */}
            <div className="book__page__skeleton book__page__skeleton__text-md"></div>

            {/* Subtitle */}
            <div className="book__page__skeleton book__page__skeleton__text-sm"></div>

            <div className="book__page__inner-book__wrapper">
              <div className="book__page__inner-book__description--wrapper">

                {/* Rating */}
                <div className="book__page__inner-book__description">
                  <div className="book__page__skeleton book__page__skeleton__icon"></div>
                  <div className="book__page__skeleton book__page__skeleton__text-sm"></div>
                  <div className="book__page__skeleton book__page__skeleton__text-sm"></div>
                </div>

                {/* Duration */}
                <div className="book__page__inner-book__description">
                  <div className="book__page__skeleton book__page__skeleton__icon"></div>
                  <div className="book__page__skeleton book__page__skeleton__text-sm"></div>
                </div>

                {/* Type */}
                <div className="book__page__inner-book__description">
                  <div className="book__page__skeleton book__page__skeleton__icon"></div>
                  <div className="book__page__skeleton book__page__skeleton__text-sm"></div>
                </div>

                {/* Key ideas */}
                <div className="book__page__inner-book__description">
                  <div className="book__page__skeleton book__page__skeleton__icon"></div>
                  <div className="book__page__skeleton book__page__skeleton__text-sm"></div>
                </div>

              </div>
            </div>

            {/* Read / Listen buttons */}
            <div className="book__page__inner-book__read--btn-wrapper">
              <div className="book__page__skeleton book__page__skeleton__button"></div>
              <div className="book__page__skeleton book__page__skeleton__button"></div>
            </div>

            {/* Bookmark */}
            <div className="book__page__inner-book__bookmark">
              <div className="book__page__skeleton book__page__skeleton__icon"></div>
              <div className="book__page__skeleton book__page__skeleton__text-sm"></div>
            </div>

            {/* Section title */}
            <div className="book__page__skeleton book__page__skeleton__text-md"></div>

            {/* Tags */}
            <div className="book__page__inner-book__tags--wrapper">
              <div className="book__page__skeleton book__page__skeleton__tag"></div>
              <div className="book__page__skeleton book__page__skeleton__tag"></div>
            </div>

            {/* Description */}
            <div className="book__page__skeleton book__page__skeleton__paragraph"></div>

            {/* About author */}
            <div className="book__page__skeleton book__page__skeleton__text-md"></div>
            <div className="book__page__skeleton book__page__skeleton__paragraph"></div>

          </div>

          {/* Book image */}
          <div className="book__page__inner-book--img-wrapper">
            <figure
              className="book__page__book__image--wrapper"
              style={{ height: "300px", width: "300px", minWidth: "300px" }}
            >
              <div
                className="book__page__skeleton book__page__skeleton__image skeleton skeleton__image"
                style={{ height: "300px", width: "300px", minWidth: "300px" }}
              ></div>
            </figure>
          </div>

        </div>
      </div>
    </div>
  );
}
