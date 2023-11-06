export default function ViewStatement({ statement }: { statement: Statement }) {
    return (
        <div className="">
            <div className="text-lg">{statement.title}</div>
            {statement.entries.map((e, i) => {
                return <div key={i}>{e.title}</div>;
            })}
        </div>
    );
}
