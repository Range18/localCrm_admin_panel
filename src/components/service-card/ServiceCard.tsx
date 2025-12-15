import "./ServiceCard.css";

export type ServiceCardData = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;

    price: number;        // в валюте по умолчанию
    durationMin: number;  // длительность в минутах
    currency?: "RUB" | "EUR" | "USD";
};

type Props = {
    data: ServiceCardData;
    onEdit?: (id: string) => void;
};

export function ServiceCard({ data, onEdit }: Props) {
    const priceText = formatMoney(data.price, data.currency ?? "RUB");
    const durationText = formatDuration(data.durationMin);

    return (
        <article className="svcCard">
            <div className="svcImgWrap" aria-hidden="true">
                {data.imageUrl ? (
                    <img className="svcImg" src={data.imageUrl} alt="" loading="lazy" />
                ) : (
                    <div className="svcImgPlaceholder">
                        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                            <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.6" />
                            <path
                                d="M6.2 12.2l2.1-2.2 2 2 2.2-2.2 2.3 2.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                )}
            </div>

            <div className="svcBody">
                <div className="svcTop">
                    <h3 className="svcTitle" title={data.title}>
                        {data.title}
                    </h3>

                    <button type="button" className="svcEditBtn" onClick={() => onEdit?.(data.id)}>
            <span className="svcEditIcon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                    d="M11.9 4.2l3.9 3.9M4.4 15.6l3.4-.6 8.2-8.2a1.8 1.8 0 0 0 0-2.6l-.2-.2a1.8 1.8 0 0 0-2.6 0L5.9 12.2l-.6 3.4Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </span>
                        Редактировать
                    </button>
                </div>

                <div className="svcMeta" aria-label="Цена и длительность">
                    <span className="svcPill isPrice">{priceText}</span>
                    <span className="svcPill isDuration">{durationText}</span>
                </div>

                <p className="svcDesc">{data.description}</p>
            </div>
        </article>
    );
}

function formatMoney(amount: number, currency: "RUB" | "EUR" | "USD") {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatDuration(min: number) {
    if (min < 60) return `${min} мин`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `${h} ч ${m} мин` : `${h} ч`;
}
