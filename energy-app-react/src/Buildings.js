const buildings = [
    {
        name: 'Burton',
        avatar: 'https://i.pinimg.com/originals/5f/08/83/5f08832ee298016cb9baa79e2a44d0c0.jpg',   
        buildingID: 1,
        floors: 4,
        //API calls here
        bfloor1: ['floor1', 12, 11, 100],
        bfloor2: ['floor2', 30, 19, 22],
        bfloor3: ['floor3', 144, 121, 100],
        bfloor4: ['floor4', 111, 1101, 1010],
    },
    {
        name: 'Sayles',
        avatar: 'https://apps.carleton.edu/reason_package/reason_4.0/www/sized_images_local/set110/488110/a39b9465187c3a6c5255046bc6381f74.jpg',
        buildingID: 2,
        floors: 2,
        //API calls here
        sfloor1: ['floor1', 162, 151, 1400],
        sfloor2: ['floor2', 302, 149, 252],
    },
    {
       name: 'Severance',
       avatar: 'https://apps.carleton.edu/reason_package/reason_4.0/www/sized_images_local/set138/496138/dda9ea601b8c4166b0ee1cd3d86e6fbb.jpg',
       buildingID: 3,
       floors: 3,  
       //API calls here
       sefloor1: ['floor1', 102, 171, 10],
       sefloor2: ['floor2',350, 19, 22],
       sefloor3: ['floor3',144, 121, 100],
    },
    {
       name: 'Davis',
       avatar: 'https://apps.carleton.edu/reason_package/reason_4.0/www/images/645842.jpg',
       buildingID: 4,
       floors: 4,
       //API calls here
       dfloor1: ['floor1', 12, 11, 100],
       dfloor2: ['floor2', 30, 19, 22],
       dfloor3: ['floor3', 144, 121, 100],
       dfloor4: ['floor4', 111, 1101, 1010],
    },
    {
       name: 'Musser',
       avatar: 'http://www.peoplesco.com/assets/images/construction-specialties/inshied_carleton-musser.jpg',
       buildingID: 5,
       floors: 4,
       //API calls here
       mfloor1: ['floor1', 12, 11, 100],
       mfloor2: ['floor2', 30, 19, 22],
       mfloor3: ['floor3', 144, 121, 100],
       mfloor4: ['floor4', 111, 1101, 1010],
    },
    {
       name: 'Myers',
       avatar: 'https://apps.carleton.edu/reason_package/reason_4.0/www/sized_images_local/set088/496088/a1e01d7aac13ef62e2d4c92b2e12ac41.jpg',
       buildingID: 6,
       floors: 4,
       //API calls here
       myfloor1: ['floor1', 12, 11, 100],
       myfloor2: ['floor2', 30, 19, 22],
       myfloor3: ['floor3', 144, 121, 100],
       myfloor4: ['floor4', 111, 1101, 1010],
    },
    {
       name: 'Cassat',
       avatar: 'https://apps.carleton.edu/reason_package/reason_4.0/www/sized_images_local/set344/586344/19248e063227e0265fb66cd1379a2352.jpg',
       buildingID: 7,
       floors: 4,
       //API calls here
       cafloor1: ['floor1', 12, 11, 100],
       cafloor2: ['floor2', 30, 19, 22],
       cafloor3: ['floor3', 2234, 3431, 4123],
       cafloor4: ['floor4', 742, 1101, 1010],
    },
    {
        name: 'Memo',
        avatar: 'http://www.lhbcorp.com/wp-content/uploads/2013/08/CarletonCollege_CassatMemorial_070353_H11_G1.jpg',
        buildingID: 8,
        floors: 4,
        //API calls here
        mefloor1: ['floor1', 1342, 1341, 11200],
        mefloor2: ['floor2', 3420, 149, 2442],
        mefloor3: ['floor3', 14244, 14121, 4100],
        mefloor4: ['floor4', 11211, 11201, 14010],
    },
    {
        name: 'Nourse',
        avatar: 'https://apps.carleton.edu/reason_package/reason_4.0/www/images_local/1057376.jpg',
        buildingID: 9,
        floors: 3,
        //API calls here
        nfloor1: ['floor1', 14244, 14121, 3100],
        nfloor2: ['floor2', 320, 119, 242],
        nfloor3: ['floor3', 1454, 1231, 1010],
    },
    {
        name: 'Evans',
        avatar: 'http://finance-commerce.com/files/2013/07/EvansHall5x.jpg',
        buildingID: 10,
        floors: 5,
        //API calls here
        efloor1: ['floor1', 12, 11, 100],
        efloor2: ['floor2', 30, 19, 22],
        efloor3: ['floor3', 144, 121, 100],
        efloor4: ['floor4', 111, 1101, 1010],
        efloor5: ['floor5', 144, 121, 100],
    },
    {
        name: 'Goodhue',
        avatar: 'https://emeraldcitybookreview.com/wp-content/uploads/sites/163/2015/10/8-GoodhueExt.jpg',
        buildingID: 11,
        floors: 4,
        //API calls here
        gfloor1: ['floor1', 12, 11, 100],
        gfloor2: ['floor2', 30, 19, 22],
        gfloor3: ['floor3', 144, 121, 100],
        gfloor4: ['floor4', 111, 1101, 1010],
    },
    {
        name: 'Watson',
        avatar: 'https://apps.carleton.edu/reason_package/reason_4.0/www/sized_images_local/set183/490183/8bc51bab3276c56a4ecc7398aeee40de.jpg',
        buildingID: 12,
        floors: 7,
        //API calls here
        wfloor1: ['floor1', 12, 11, 100],
        wfloor2: ['floor2', 30, 19, 22],
        wfloor3: ['floor3', 144, 121, 100],
        wfloor4: ['floor4', 111, 1101, 1010],
        wfloor5: ['floor5', 30, 19, 22],
        wfloor6: ['floor6', 144, 121, 100],
        wfloor7: ['floor7', 111, 1101, 1010],
    },
    {
        name: 'Scoville',
        avatar: 'https://apps.carleton.edu/reason_package/reason_4.0/www/images_local/1579342.jpg',
        buildingID: 11,
        floors: 2,
        //API calls here
        scfloor1: ['floor1', 12, 11, 100],
        scfloor2: ['floor2', 30, 19, 22],
    },
]

export default buildings