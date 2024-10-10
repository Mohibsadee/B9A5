document.addEventListener('DOMContentLoaded', function () {
    let selectedSeats = [];
    let totalPrice = 0;
    const seatPrice = 550;

    const buttons = document.querySelectorAll('.seat-button');
    const seatCountDisplay = document.getElementById('seat-count');
    const selectedSeatsContainer = document.getElementById('selected-seats');
    const totalPriceDisplay = document.getElementById('total-price');
    const grandTotalDisplay = document.getElementById('grand-total');
    const remainSeat = document.getElementById('remain-seat');
    const nextButton = document.getElementById('next-button');
    const apply = document.getElementById('apply-coupon');



    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const seatName = this.textContent;
            toggleSeat(this, seatName);
        });
    });

    function toggleSeat(button, seatName) {
        if (button.classList.contains('bg-green-500')) {
            // Deselect seat
            button.classList.remove('bg-green-500');
            button.classList.add('bg-slate-100');

            selectedSeats = selectedSeats.filter(seat => seat !== seatName);
            totalPrice -= seatPrice;
        } else {
            // Select seat
            button.classList.remove('bg-slate-100');
            button.classList.add('bg-green-500');

            selectedSeats.push(seatName);
            totalPrice += seatPrice;
        }
        updateSeatInfo();
    }

    function updateSeatInfo() {
        // Update the seat count
        seatCountDisplay.textContent = selectedSeats.length;

        // Update the selected seats list
        selectedSeatsContainer.innerHTML = '';



        selectedSeats.forEach(seat => {
            selectedSeatsContainer.innerHTML +=

                `<div class="flex text-gray-500 mb-2 justify-between">
                    <p class="px-6">${seat}</p>
                    <p class="px-6">Economy</p>
                    <p class="px-6">${seatPrice}</p>
                </div>`;


        });

        // Update the price displays
        totalPriceDisplay.textContent = totalPrice;
        grandTotalDisplay.textContent = totalPrice;

        // Update the remaining seat count
        updateRemainSeat();

        // Enable or disable the Next button based on selected seats
        if (selectedSeats.length > 0) {
            nextButton.disabled = false;
            nextButton.classList.remove('bg-slate-100');
            nextButton.classList.add('bg-green-500');

            if (selectedSeats.length >= 4) {
                apply.disabled = false;
                apply.classList.remove('bg-slate-100');
                apply.classList.add('bg-green-500');
                apply.classList.add('text-white');
            }
            else {
                apply.disabled = true;   // Disable if no seats are selected
                apply.classList.remove('bg-green-500');
                apply.classList.add('bg-slate-100');

            }
        } else {
            nextButton.disabled = true;   // Disable if no seats are selected
            nextButton.classList.remove('bg-green-500');
            nextButton.classList.add('bg-slate-100');
        }
    }

    function updateRemainSeat() {
        remainSeat.textContent = 40 - selectedSeats.length;
    }

    document.getElementById('next-button').addEventListener('click', function () {
        window.location.href = '../html/success.html';
    });


});
