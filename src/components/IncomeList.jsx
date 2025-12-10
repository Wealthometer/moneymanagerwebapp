import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <div className="flex items-center justify-end gap-2">
          {/* Apply card-btn-primary for the distinctive purple style */}
          <button className="card-btn card-btn-primary">
            <Mail size={15} className="text-base" />
            Email
          </button>
          {/* Keep only the default card-btn for the light gray style */}
          <button className="card-btn card-btn-primary">
            <Download size={15} className="text-base" />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* display the incomes */}
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onClick={() => onDelete(income.id)}
          />
        ))}
      </div> 

    </div>
  );
};

export default IncomeList;
