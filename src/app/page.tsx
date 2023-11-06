'use client';

import { Divider, InsertStatement, ViewStatement } from '@/components';
import { useEffect, useState } from 'react';

export default function Home() {
    const [statements, setStatements] = useState<Statement[]>([]);

    useEffect(() => {
        const statementsCache = localStorage.getItem('statements');
        if (!statementsCache) return;
        setStatements(JSON.parse(statementsCache));
    }, []);

    const handleNewStatement = async (value: Statement) => {
        const newState = [...statements, value];
        setStatements(newState);
        localStorage.setItem('statements', JSON.stringify(newState));
    };

    return (
        <main className="max-w-[700px] m-auto">
            <div className="my-6">
                <h1 className="text-lg font-bold">Analyze</h1>
                <h2>Faça upload dos seus extrados da Nubank</h2>
            </div>
            <Divider />
            <InsertStatement include={handleNewStatement} />
            {statements.map((e, i) => {
                return <ViewStatement key={i} statement={e} />;
            })}
        </main>
    );
}
