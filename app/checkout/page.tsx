"use client";

type Props = {
  search: string;
}

export default function page({ search }: Props) {

  return (
    <div className="checkout__wrapper">
      <div className="checkout__card">
        <div className="checkout__title">Checkout</div>

        <div className="checkout__summary">
          <div className="checkout__plan">
            <div className="checkout__plan--label">Selected Plan:</div>
            <div className="checkout__plan--value">
              {search === "yearly"
                ? "Premium Plus Yearly — $99.99/year"
                : "Premium Monthly — $9.99/month"}
            </div>
          </div>

          <div className="checkout__details">
            <p>This is a dummy checkout page.</p>
            <p>No payment will be processed.</p>
          </div>

          <button className="btn checkout__btn">
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
