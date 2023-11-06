'use client';
import { useState, useRef, ChangeEvent } from 'react';

export default function InsertStatement({
    include,
}: {
    include: (event: Statement) => void;
}) {
    const [title, setTitle] = useState<string>('');
    const [uploadedEntries, setUploadedEntries] = useState<Entry[]>([]);
    const uploadButtonRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        uploadButtonRef.current?.click();
    };

    const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const uploaded = event.target.files?.item(0);

        if (!uploaded || uploaded.type != 'text/csv') return;

        const text = (await uploaded.text()).split('\n');
        text.shift();

        const entries = text.map((e) => {
            const splited = e.split(',');
            const item: Entry = {
                date: new Date(splited[0]),
                category: splited[1],
                title: splited[2],
                amount: Number.parseFloat(splited[3]),
            };
            return item;
        });

        setUploadedEntries(entries);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!title) {
            return alert('Título não pode ficar em branco!');
        }

        if (!uploadedEntries || uploadedEntries.length == 0) {
            return alert(
                'Sem entradas selecionadas! Selecione um arquivo com entradas!'
            );
        }

        const statement: Statement = {
            title: title,
            entries: uploadedEntries,
        };

        include(statement);

        setTitle('');
        setUploadedEntries([]);
    };

    return (
        <div className="bg-gray-200 px-2 py-2 rounded">
            <p className="font-bold mb-2">Adicionar nova fatura</p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 items-start"
            >
                <input
                    type="text"
                    name="description"
                    id="description"
                    className="rounded px-2"
                    placeholder="Título"
                    onChange={handleTitle}
                />
                <input
                    type="file"
                    onChange={handleFile}
                    accept=".csv"
                    className="hidden"
                    ref={uploadButtonRef}
                />
                <button
                    onClick={handleButtonClick}
                    type="button"
                    className="rounded shadow bg-gray-300 hover:bg-gray-400 border border-black text-sm py-1 px-3 transition-colors"
                >
                    {!uploadedEntries || uploadedEntries.length == 0
                        ? 'Nenhum arquivo selecionado'
                        : `${uploadedEntries.length} entradas`}
                </button>

                <button
                    type="submit"
                    className="rounded-full bg-indigo-400 hover:bg-indigo-600 text-white px-6 py-1 transition-colors"
                >
                    Adicionar
                </button>
            </form>
        </div>
    );
}
