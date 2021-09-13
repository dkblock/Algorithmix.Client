import React from "react";
import AlgorithmTimeComplexity from "../algorithm-time-complexity";
import { getFileSrc } from "../../../utils/get-file-src";

const AvlTreeDescription = (props) => {
    const { algorithm: { timeComplexity } } = props;

    return (
        <>
            <div>
                <div className="description-container">
                    <div className="col-8">
                        <div className="description-paragraph">
                            <b>AVL-дерево</b> — сбалансированное двоичное дерево поиска, в котором поддерживается
                            следующее
                            свойство:
                            для каждой его вершины высоты её левого и правого поддеревьев различаются не более, чем на
                            1.
                        </div>
                        <div className="description-paragraph">
                            Доказано, что этого свойства достаточно для того, чтобы высота дерева логарифмически
                            зависела от
                            числа его узлов:
                            высота <i>h</i> AVL-дерева с n ключами лежит в диапазоне от lg(n + 1) до 1.4405*lg(n + 2) -
                            0.3277.
                            А так как основные операции над двоичными деревьями поиска (поиск, вставка и удаление узлов)
                            линейно зависят от его высоты,
                            то получаем <i>гарантированную</i> логарифмическую зависимость времени работы этих
                            алгоритмов от
                            числа ключей, хранимых в дереве.
                        </div>
                        <div className="description-paragraph">
                            AVL-дерево — это прежде всего двоичное дерево поиска, ключи которого удовлетворяют
                            стандартному
                            свойству:
                            ключ любого узла дерева не меньше любого ключа в левом поддереве данного узла и не больше
                            любого
                            ключа в правом поддереве этого узла.
                            Это значит, что для поиска нужного ключа в АВЛ-дереве можно использовать стандартный
                            алгоритм.
                        </div>
                        <div className="description-paragraph">
                            AVL-деревья названы по первым буквам фамилий их изобретателей,
                            Г. М. Адельсона-Вельского и Е. М. Ландиса, которые впервые предложили использовать
                            AVL-деревья в
                            1962 году.
                        </div>
                    </div>
                    <div className="col-4">
                        <img
                            className="description-image"
                            src={getFileSrc("images/algorithms/avl-tree.png")}
                            alt="avl-tree"
                        />
                        <div className="description-title"/>
                        <AlgorithmTimeComplexity complexity={timeComplexity}/>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="description-section-title">Балансировка</h3>
                <hr/>
                <div className="description-container">
                    <div className="col-8">
                        <div className="description-paragraph">
                            Каждый узел AVL-дерева хранит разницу высот правого и левого
                            поддеревьев (коэффициент сбалансированности): -1 (если высота левого
                            поддерева на 1 больше высоты правого поддерева), +1 (если высота правого
                            поддерева на 1 больше высоты левого поддерева), 0 (если высоты обоих
                            поддеревьев равны).
                        </div>
                        <div className="description-paragraph">
                            Если вставка или удаление элемента приводит к нарушению
                            сбалансированности дерева, то выполняется его балансировка: в случае, если
                            разница высот левого и правого поддеревьев узла Х равна 2, происходит
                            изменение связей предок-потомок в поддереве данного узла так, что разница
                            становится ≤ 1.
                        </div>
                    </div>
                    <div className="col-4">
                        <img
                            className="description-image"
                            src={getFileSrc("images/descriptions/avl-tree/example.png")}
                            alt="avl-tree example"
                        />
                        <h6 className="text-center">Простой пример AVL-дерева</h6>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="description-section-title">Повороты в AVL-дереве</h3>
                <hr/>
                <div className="description-container">
                    <div className="col-12">
                        <div className="description-paragraph">
                            Балансировка в AVL-дереве осуществляется с помощью операций вращения. Существует четыре типа
                            поворотов:

                            <ol>
                                <li>Одиночный правый поворот</li>
                                <li>Одиночный левый поворот</li>
                                <li>Двойной лево-правый поворот</li>
                                <li>Двойной право-левый поворот</li>
                            </ol>
                        </div>
                        <div className="description-paragraph">
                            Любая операция приводит к нужному результату, а полная высота дерева
                            уменьшается не более, чем на 1, и не может увеличиться. Каждый поворот
                            сохраняет свойства бинарного дерева поиска и выполняется за константное
                            время: вычислительная сложность – О(1).
                        </div>
                        <div className="description-paragraph">
                            <i>Примечание</i>: на изображениях ниже буквами X, Y, Z обозначены узлы дерева; A, B, C, D –
                            произвольные поддеревья.
                        </div>
                    </div>
                </div>
                <div className="description-container">
                    <div className="col-6">
                        <img
                            className="description-image"
                            src={getFileSrc("images/descriptions/avl-tree/right-rotate.png")}
                            alt="avl-tree right-rotate"
                        />
                        <h6 className="text-center">Одиночный правый поворот</h6>
                        <div className="description-title"/>
                        <img
                            className="description-image"
                            src={getFileSrc("images/descriptions/avl-tree/left-right-rotate.png")}
                            alt="avl-tree left-right-rotate"
                        />
                        <h6 className="text-center">Двойной лево-правый поворот</h6>
                    </div>
                    <div className="col-6">
                        <img
                            className="description-image"
                            src={getFileSrc("images/descriptions/avl-tree/left-rotate.png")}
                            alt="avl-tree left-rotate"
                        />
                        <h6 className="text-center">Одиночный левый поворот</h6>
                        <div className="description-title"/>
                        <img
                            className="description-image"
                            src={getFileSrc("images/descriptions/avl-tree/right-left-rotate.png")}
                            alt="avl-tree right-left-rotate"
                        />
                        <h6 className="text-center">Двойной право-левый поворот</h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AvlTreeDescription;