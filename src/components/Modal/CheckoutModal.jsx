import Checkout from "../Cart/Checkout";
import Modal from "../modal";

const CheckoutModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      heading="Checkout"
      className="w-full sm:max-w-7xl h-[95vh] !rounded-3xl bg-white"
    >
      <Checkout isModal={true} />
    </Modal>
  );
};

export default CheckoutModal;
