import { TeamMemberPreview } from "./TeamMemberPreview";


export function TeamMemberList({ teamMembers }) {

    return (
        <div className="team-member-list">
            {teamMembers.map((teamMember, idx) =>
                <TeamMemberPreview idx={idx} key={teamMember.id} teamMember={teamMember} />
            )}
        </div>
    )
}
