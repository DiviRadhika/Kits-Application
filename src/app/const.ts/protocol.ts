export interface protocol {

    
        protocol_id: string;
        sponsor_id: string;
        cro_id: string;
        no_of_sites: number,
        total_patients: string,
        site_ids: [
          string
        ],
        screening_kit_count: string,
        screening_kit_lab_test_details: [
          {
            lab_test_id: string,
            frozen_status: true;
          }
        ],
        visit_kit_count: string;
        visit_kit_details: [
          {
            no_of_visits: number;
            kit_type: string;
            lab_id: string;
          }
        ]
      }
    


