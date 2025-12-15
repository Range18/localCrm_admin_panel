import "./MasterCard.css";

export type MasterCardData = {
    id: string;
    firstName: string;
    lastName: string;
    description: string;
    specialization: string;
    imageUrl?: string;
};

type Props = {
    data: MasterCardData;
    onEdit?: (id: string) => void;
};

export function MasterCard({ data, onEdit }: Props) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    return (
        <article className="mstCard">
            <div className="mstImgWrap" aria-hidden="true">
                {data.imageUrl ? (
                    <img className="mstImg" src={data.imageUrl} alt="" loading="lazy" />
                ) : (
                    <div className="mstImgPlaceholder">
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

            <div className="mstBody">
                <div className="mstTop">
                    <h3 className="mstTitle" title={fullName}>
                        {fullName}
                    </h3>

                    <button type="button" className="mstEditBtn" onClick={() => onEdit?.(data.id)}>
            <span className="mstEditIcon" aria-hidden="true">
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

                <div className="mstMeta" aria-label="Специализация">
                    <span className="mstPill">{data.specialization}</span>
                </div>

                <p className="mstDesc">{data.description}</p>
            </div>
        </article>
    );
}
