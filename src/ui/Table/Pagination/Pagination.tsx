import Button from '../../Button/Button.tsx';
import { range } from '../../../utils.ts';

interface Props {
    currentPage: number,
    pageCount: number,
    onChange: (page: number) => void,
    delta: number,
}

export default function Pagination({ currentPage, pageCount, delta, onChange }: Props) {
    function handlePageChange(page: number) {
        if (page < 1 || page > pageCount) {
            return;
        }

        console.log(page);

        onChange(page);
    }

    function getLink(page: number, isCurrentPage: boolean) {
        return (
            <Button
                type={'link'}
                title={isCurrentPage ? `[ ${String(page)} ]` : String(page)}
                onClick={() => { handlePageChange(page); }}
            />
        );
    }

    const getPagesArray = (currentPage: number, pageCount: number, delta: number) => {
        return [1, ...range(currentPage - delta, currentPage + delta), pageCount]
            .reduce((acc: number[], v: number, i: number) => {
                if ((i === 0 || v > acc[acc.length - 1]) && (v >= 1 && v <= pageCount)) {
                    acc.push(v);
                }

                return acc;
            }, []);
    };

    const pages = getPagesArray(currentPage, pageCount, delta);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
            }}
        >
            <Button
                type={'link'}
                title={'<'}
                onClick={() => { handlePageChange(currentPage - 1); }}
                isDisabled={currentPage === pages[0]}
            />
            {
                pages.map((page: number, index: number, arr: number[]) => {
                    const isCurrentPage = currentPage === page;

                    if (index === 0) {
                        return getLink(page, isCurrentPage);
                    }

                    if (page - arr[index - 1] > 1) {
                        return (
                            <>
                                <span>...</span>
                                { getLink(page, isCurrentPage) }
                            </>
                        );
                    }

                    return (
                        <>
                            { getLink(page, isCurrentPage) }
                        </>
                    );
                })
            }
            <Button
                type={'link'}
                title={'>'}
                onClick={() => { handlePageChange(currentPage + 1); }}
                isDisabled={currentPage === pages[pages.length - 1]}
            />
        </div>
    );
}
