

export function TeamMemberPreview({ teamMember, idx }) {
    return (
        <article className="team-member-preview">
            <h2>{teamMember.id}</h2>
            <h2>{teamMember.name}</h2>
            <h2>{teamMember.position}</h2>
            <h2>{teamMember.age}</h2>
        </article>
    )

}
