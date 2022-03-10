import { Component, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

type Props = {
    isShow?: boolean;
    onBackdropClick?: () => void;
    onClose?: () => void;
}

/**
 * Компонент модального окна
 *
 * @example
 * <Modal isShow={modalShow()} onBackdropClick={toggleModal}>
 *     <h3 class="font-bold text-lg">Modal title</h3>
 *     <p class="py-4">Modal description</p>
 *     <ModalAction>
 *         <button class="btn" onClick={toggleModal}>Yay!</button>
 *     </ModalAction>
 * </Modal>
 */
export const Modal: Component<Props> = (props) => {

    function backdropClickHandler() {
        if (props.onBackdropClick) {
            props.onBackdropClick();
        }
    }

    return (
        <Show when={props.isShow}>
            <Portal>
                <div class="modal opacity-100 visible z-50 pointer-events-auto" onClick={backdropClickHandler}>
                    <div class="modal-box opacity-100" onClick={e => e.stopPropagation()}>
                        {props.children}
                    </div>
                </div>
            </Portal>
        </Show>
    );
};