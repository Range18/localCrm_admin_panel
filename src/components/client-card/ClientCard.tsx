import "./ClientCard.css";
import {ClientCardData} from "./types";

type ClientCardProps = {
    data: ClientCardData;
    onEdit?: (id: string) => void;
};

export function ClientCard({ data, onEdit }: ClientCardProps) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    return (
        <article className="clCard">
            <div className="clImgWrap" aria-hidden="true">
                {data.imageUrl ? (
                    <img className="clImg" src={data.imageUrl} alt="" loading="lazy" />
                ) : (
                    <div className="clImgPlaceholder">
                        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M10 10.3a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            />
                            <path
                                d="M4.2 17.2c1-3.3 3.4-4.9 5.8-4.9s4.8 1.6 5.8 4.9"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                )}
            </div>

            <div className="clBody">
                <div className="clTop">
                    <h3 className="clTitle" title={fullName}>
                        {fullName}
                    </h3>

                    <button type="button" className="clEditBtn" onClick={() => onEdit?.(data.id)}>
            <span className="clEditIcon" aria-hidden="true">
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

                <div className="clMeta">
          <span className={`clPill ${data.source === "telegram" ? "isTg" : "isWa"}`}>
            <span className="clPillIcon" aria-hidden="true">
              {data.source === "telegram" ? <IconTelegram /> : <IconWhatsapp />}
            </span>
              {data.source === "telegram" ? "Telegram" : "WhatsApp"}
          </span>

                    {data.source === "telegram" && data.telegramUsername ? (
                        <span className="clPill isUser">@{data.telegramUsername.replace(/^@/, "")}</span>
                    ) : null}
                </div>

                <div className="clRow">
                    <span className="clLabel">Телефон</span>
                    <span className="clValue">{data.phone}</span>
                </div>
            </div>
        </article>
    );
}

function IconTelegram() {
    return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
                d="M16.8 4.2L3.9 9.3c-.8.3-.8 1.4 0 1.7l3.1 1.1 1.2 3.3c.3.8 1.3.9 1.8.2l1.7-2.2 3.1 2.3c.7.5 1.7.1 1.9-.8l2.1-9.4c.2-1-0.7-1.8-1.7-1.3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconWhatsapp() {
    return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
                d="M10 3.2a6.8 6.8 0 0 0-5.9 10.2l-.6 3 3-.6A6.8 6.8 0 1 0 10 3.2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M8.1 7.7c.2-.3.6-.3.8 0l.8 1.3c.2.3.1.7-.2.9l-.5.3c.6 1 1.5 1.8 2.5 2.4l.3-.5c.2-.3.6-.4.9-.2l1.3.8c.3.2.3.6 0 .8-.6.7-1.6 1-2.5.6-2.4-1-4.4-3-5.4-5.4-.4-.9-.1-1.9.6-2.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}
