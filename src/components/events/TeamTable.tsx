export default function TeamTable({ teamsData }: { teamsData: any }) {
  return (
    <div className="bg-[#330B45] rounded-lg overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-[#4A0D63] text-left">
            <th className="p-3">Team Name</th>
            <th className="p-3">Captain</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Age</th>
          </tr>
        </thead>
        <tbody>
          {teamsData.map((team: any) => (
            <tr key={team.id} className="border-b border-[#4A0D63]">
              <td className="p-3">{team.teamName}</td>
              <td className="p-3">{team.name}</td>
              <td className="p-3">{team.gender}</td>
              <td className="p-3">{team.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
