import '../FormLayout/FormLayout.css';
import './ExpensesForm.css';
import { type ChangeEvent, type SyntheticEvent, useState } from 'react';
import FormLayout from '../FormLayout/FormLayout.tsx';
import type { Expense, Group, Member } from '../../types/types.ts';

type Checks = Record<string, boolean>;
interface DividedSum { fraction: number, ways: number }

const getSumDivided = (amount: number, checkStates: Checks): DividedSum => {
    const numberOfChecked = Object.values(checkStates).reduce((acc, value) => {
        return value ? acc + 1 : acc;
    }, 0);

    if (!numberOfChecked || !amount) {
        return { fraction: 0, ways: 0 };
    }

    return { fraction: Math.round(amount / numberOfChecked * 100) / 100, ways: numberOfChecked };
};

const getHintString = (amount: number, checkStates: Checks): string => {
    const result: DividedSum = getSumDivided(amount, checkStates);

    if (!result.fraction || !result.ways) {
        return '';
    }

    return `${String(result.fraction)} руб/чел`;
};

const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
    const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

    el.focus();
};

const GROUP: Group = {
    name: 'Buhaem v pyatnicu',
    members: [
        {
            id: 1,
            name: 'Леша',
        },
        {
            id: 2,
            name: 'Саша',
        },
        {
            id: 3,
            name: 'Ваня',
        },
        {
            id: 4,
            name: 'Дима',
        },
        {
            id: 5,
            name: 'Тима',
        },
        {
            id: 6,
            name: 'Фая',
        },
    ],
};

export default function ExpensesForm() {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const [divideEvenly, setDivideEvenly] = useState<boolean>(true);

    const [checksState, setChecksState] = useState<Checks>(() => {
        return GROUP.members.reduce((acc: Checks, value: Member) => {
            return { ...acc, [value.name]: true };
        }, {});
    });

    const handleCheckStateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const elementName = e.target.name;

        setChecksState({ ...checksState, [elementName]: !checksState[elementName] });
    };

    // todo: не обновляется c useMemo
    const hintString = getHintString(+amount, checksState);

    const [expenseName, setExpenseName] = useState('');

    const handleExpenseNameInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setExpenseName(e.target.value);
    };

    return (
        <FormLayout>
            <div
                onClick={handleEditClick}
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input'
            >
                <input
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    type="text"
                    placeholder='Введите комментарий'
                    onChange={handleExpenseNameInput}
                />
            </div>
            <div
                onClick={handleEditClick}
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input'
            >
                <input
                    type="text"
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    placeholder='Введите сумму'
                    value={amount}
                    onChange={handleAmountChange}
                />
            </div>

            {hintString && (
                <div className={'form-layout__row'}>
                    <span>{hintString}</span>
                </div>
            )}

            {
                divideEvenly ? (
                    <></>
                ) : (
                    GROUP.members.map((member: Member, index: number) => (
                        <div className='form-layout__row form-layout__row_bordered' key={index}>
                            <label style={{ cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name={member.name}
                                    onChange={handleCheckStateChange}
                                    style={{ margin: '1rem', cursor: 'pointer' }}
                                />
                                <span>{member.name}</span>
                            </label>
                        </div>
                    ))
                )
            }

            <button
                onClick={() => {
                    Object.keys(checksState).forEach((name: string) => {
                        checksState[name] = !divideEvenly;
                    });

                    setDivideEvenly((prev: boolean) => !prev);
                }}
            >{divideEvenly ? 'Выбрать из списка' : 'Разделить поровну'}</button>

            <button
                className='form-layout__button_primary form-layout__button_full-width'
                onClick={() => {
                    const expense: Expense = {
                        total: +amount,
                        details: expenseName,
                        group: GROUP,
                    };

                    console.log(expense);
                }}
            >Сохранить
            </button>
        </FormLayout>
    );
}
