def calculate_total(price, quantity):
    tax_rate = 0.18
    total = price * quantity
    final_amount = total + (total * tax_rate)

    print("Total amount:", final_amount)
    return final_amount


calculate_total(1000, 2)