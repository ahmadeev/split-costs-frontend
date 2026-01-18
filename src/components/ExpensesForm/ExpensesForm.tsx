import './ExpensesForm.css';
import { type ChangeEvent, useState } from 'react';

type Checks = Record<string, boolean>;
interface DividedSum { fraction: number, ways: number }

const GROUP_NAMES = ['Леша', 'Саша', 'Ваня', 'Толя', 'Вася', 'Акакий'];

export default function ExpensesForm() {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const [divideEvenly, setDivideEvenly] = useState<boolean>(true);

    const [checksState, setChecksState] = useState<Checks>(() => {
        return GROUP_NAMES.reduce((acc: Checks, value: string) => {
            return { ...acc, [value]: true };
        }, {});
    });

    const handleCheckStateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const elementName = e.target.name;

        setChecksState({ ...checksState, [elementName]: !checksState[elementName] });
    };

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

    return (
        <div className={'expense-form__container'}>
            <div className='expense-form__row'>
                <input
                    type="text"
                    placeholder='Введите сумму'
                    value={amount}
                    onChange={handleAmountChange}
                />
            </div>

            <div className={'expense-form__row'}>
                <span>{getHintString(+amount, checksState)}</span>
            </div>

            {
                divideEvenly ? (
                    <></>
                ) : (
                    GROUP_NAMES.map((name: string, index: number) => (
                        <div className='expense-form__row' key={index}>
                            <input
                                type="checkbox"
                                name={name}
                                onChange={handleCheckStateChange}
                            />
                            <span>{name}</span>
                        </div>
                    ))
                )
            }

            <div className={'expense-form__row'}>
                <button
                    onClick={() => {
                        Object.keys(checksState).forEach((name: string) => {
                            checksState[name] = !divideEvenly;
                        });

                        setDivideEvenly((prev: boolean) => !prev);
                    }}
                >{divideEvenly ? 'Выбрать из списка' : 'Разделить поровну'}</button>
            </div>

            <div className={'expense-form__row'}>
                <button
                    onClick={() => {
                        console.log(amount);
                        console.log(Object.keys(checksState).filter(name => checksState[name]));
                    }}
                >Сохранить
                </button>
            </div>
        </div>
    );
}
